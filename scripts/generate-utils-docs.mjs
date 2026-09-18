// Generates Storybook doc pages from the JSDoc/signatures found in src/utils/*.ts.
// Run automatically before `dev`/`build` - see package.json.
import ts from "typescript-classic";
import {readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync} from "node:fs";
import {join, dirname, basename} from "node:path";
import {fileURLToPath} from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const utilsDir = join(rootDir, "src/utils");
const outDir = join(rootDir, "src/stories/utils");

function jsDocOf(node) {
	const jsDocs = ts.getJSDocCommentsAndTags(node).filter(ts.isJSDoc);
	if (jsDocs.length === 0) {
		return undefined;
	}
	const doc = jsDocs.at(-1);
	const description = doc.comment ? ts.getTextOfJSDocComment(doc.comment) : undefined;
	const tags = (doc.tags ?? []).map(tag => ({
		name: tag.tagName.text,
		param: ts.isJSDocParameterTag(tag) && ts.isIdentifier(tag.name) ? tag.name.text : undefined,
		text: tag.comment ? ts.getTextOfJSDocComment(tag.comment) : "",
	}));
	return {description, tags};
}

function hasModifier(node, kind) {
	return !!ts.canHaveModifiers(node) && !!ts.getModifiers(node)?.some(m => m.kind === kind);
}

function isPrivate(node) {
	return (
		hasModifier(node, ts.SyntaxKind.PrivateKeyword) ||
		hasModifier(node, ts.SyntaxKind.ProtectedKeyword) ||
		(ts.isPropertyDeclaration(node) && ts.isPrivateIdentifier(node.name))
	);
}

/** Slices the signature (everything up to the body/semicolon), skipping leading JSDoc. */
function signatureText(source, node) {
	const start = node.getStart(source);
	const body = node.body;
	const end = body ? body.getStart(source) : node.getEnd();
	let text = source.text.slice(start, end).trimEnd();
	text = text.replace(/[{:]$/, "").trimEnd();
	if (!body && !text.endsWith(";")) {
		text += ";";
	}
	return text;
}

/** Turns JSDoc `{@link Name}` / `{@link Name Text}` into a `Utils/Name` doc-page link, or inline code if there's no matching page. */
function renderLinks(text, knownNames) {
	return text.replace(/\{@link\s+([^}\s|]+)(?:[\s|]+([^}]+))?\}/gu, (_, name, label) => {
		const display = (label ?? name).trim();
		return knownNames.has(name)
			? `[${display}](?path=/docs/utils-${name.toLowerCase()}--docs)`
			: `\`${display}\``;
	});
}

function renderJsDoc(jsdoc, knownNames) {
	if (!jsdoc) {
		return "";
	}
	let md = "";
	if (jsdoc.description) {
		md += `${renderLinks(jsdoc.description, knownNames)}\n\n`;
	}
	const params = jsdoc.tags.filter(t => t.name === "param" && t.param);
	if (params.length > 0) {
		md += `${params.map(t => `- \`${t.param}\` ${renderLinks(t.text, knownNames)}`).join("\n")}\n\n`;
	}
	const returns = jsdoc.tags.find(t => t.name === "returns" || t.name === "return");
	if (returns?.text) {
		md += `**Returns:** ${renderLinks(returns.text, knownNames)}\n\n`;
	}
	const examples = jsdoc.tags.filter(t => t.name === "example" && t.text);
	for (const example of examples) {
		md += examples.length > 1 ? `**Example:**\n\n${example.text}\n\n` : `${example.text}\n\n`;
	}
	return md;
}

function renderSignatureBlock(signatures) {
	return `\`\`\`ts\n${signatures.join("\n")}\n\`\`\`\n\n`;
}

function parseFile(fileName) {
	const filePath = join(utilsDir, fileName);
	const sourceText = readFileSync(filePath, "utf-8");
	const source = ts.createSourceFile(
		fileName,
		sourceText,
		ts.ScriptTarget.Latest,
		true,
		ts.ScriptKind.TS,
	);

	/** @type {Map<string, {kind: string, node: ts.Node, declNodes: ts.Node[]}>} */
	const declByName = new Map();
	const namespacesByName = new Map();
	const exportedNames = new Map();
	const aliasesByLocalName = new Map();
	let defaultExportName;

	for (const statement of source.statements) {
		if (ts.isFunctionDeclaration(statement) && statement.name) {
			const name = statement.name.text;
			const entry = declByName.get(name) ?? {kind: "function", declNodes: []};
			entry.declNodes.push(statement);
			declByName.set(name, entry);
			if (hasModifier(statement, ts.SyntaxKind.ExportKeyword)) {
				exportedNames.set(name, name);
			}
		} else if (ts.isClassDeclaration(statement) && statement.name) {
			declByName.set(statement.name.text, {kind: "class", declNodes: [statement]});
			if (hasModifier(statement, ts.SyntaxKind.ExportKeyword)) {
				exportedNames.set(statement.name.text, statement.name.text);
			}
		} else if (ts.isTypeAliasDeclaration(statement)) {
			declByName.set(statement.name.text, {kind: "type", declNodes: [statement]});
			if (hasModifier(statement, ts.SyntaxKind.ExportKeyword)) {
				exportedNames.set(statement.name.text, statement.name.text);
			}
		} else if (ts.isInterfaceDeclaration(statement)) {
			declByName.set(statement.name.text, {kind: "interface", declNodes: [statement]});
			if (hasModifier(statement, ts.SyntaxKind.ExportKeyword)) {
				exportedNames.set(statement.name.text, statement.name.text);
			}
		} else if (ts.isModuleDeclaration(statement) && ts.isIdentifier(statement.name)) {
			namespacesByName.set(statement.name.text, statement);
		} else if (
			ts.isExportDeclaration(statement) &&
			!statement.moduleSpecifier &&
			statement.exportClause &&
			ts.isNamedExports(statement.exportClause)
		) {
			for (const el of statement.exportClause.elements) {
				const localName = (el.propertyName ?? el.name).text;
				const exportedName = el.name.text;
				exportedNames.set(localName, localName);
				if (exportedName !== localName) {
					const list = aliasesByLocalName.get(localName) ?? [];
					list.push(exportedName);
					aliasesByLocalName.set(localName, list);
				}
			}
		} else if (ts.isExportAssignment(statement) && !statement.isExportEquals) {
			if (ts.isIdentifier(statement.expression)) {
				defaultExportName = statement.expression.text;
			}
		} else if (
			ts.isExpressionStatement(statement) &&
			ts.isBinaryExpression(statement.expression) &&
			statement.expression.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
			ts.isPropertyAccessExpression(statement.expression.left) &&
			ts.isIdentifier(statement.expression.left.expression)
		) {
			const owner = statement.expression.left.expression.text;
			const member = statement.expression.left.name.text;
			const rhs = statement.expression.right;

			if (ts.isIdentifier(rhs) && declByName.has(rhs.text)) {
				// e.g. `assert.ok = assert;` - a plain alias, not a new member.
				const list = aliasesByLocalName.get(rhs.text) ?? [];
				list.push(`${owner}.${member}`);
				aliasesByLocalName.set(rhs.text, list);
				continue;
			}

			const entry = declByName.get(owner);
			if (entry) {
				entry.staticMembers ??= [];
				entry.staticMembers.push({name: member, statement, rhs});
			}
		}
	}

	const entities = [];
	for (const [localName, exportedName] of exportedNames) {
		const entry = declByName.get(localName);
		if (!entry) {
			continue;
		}
		const aliases = [...(aliasesByLocalName.get(localName) ?? [])];
		if (defaultExportName === localName) {
			aliases.push("default");
		}
		entities.push({name: exportedName, aliases, entry});
	}
	// Keep source order.
	entities.sort((a, b) => a.entry.declNodes[0].pos - b.entry.declNodes[0].pos);

	return {fileName, source, entities, namespacesByName};
}

function renderFile({fileName, source, entities, namespacesByName}, knownNames) {
	let md = `# \`${fileName}\`\n\n`;

	for (const {name, aliases, entry} of entities) {
		md += `## \`${name}\`\n\n`;

		if (aliases.length > 0) {
			md += `> Also exported as ${aliases.map(a => (a === "default" ? "the **default export**" : `\`${a}\``)).join(", ")}.\n\n`;
		}

		if (entry.kind === "function") {
			const jsdoc = entry.declNodes.map(jsDocOf).find(Boolean);
			md += renderJsDoc(jsdoc, knownNames);
			md += renderSignatureBlock(entry.declNodes.map(n => signatureText(source, n)));
		} else if (entry.kind === "type" || entry.kind === "interface") {
			const node = entry.declNodes[0];
			md += renderJsDoc(jsDocOf(node), knownNames);
			md += renderSignatureBlock([node.getText(source)]);
		} else if (entry.kind === "class") {
			const node = entry.declNodes[0];
			md += renderJsDoc(jsDocOf(node), knownNames);
			const typeParams = node.typeParameters
				? `<${node.typeParameters.map(t => t.getText(source)).join(", ")}>`
				: "";
			const heritage = node.heritageClauses?.map(h => h.getText(source)).join(" ") ?? "";
			md += renderSignatureBlock([`class ${name}${typeParams}${heritage ? ` ${heritage}` : ""}`]);

			for (const member of node.members) {
				if (isPrivate(member) || (!member.name && !ts.isConstructorDeclaration(member))) {
					continue;
				}
				const memberName = member.name?.getText(source);
				const prefix = ts.isConstructorDeclaration(member)
					? "constructor"
					: ts.isGetAccessor(member)
						? `get ${memberName}`
						: ts.isSetAccessor(member)
							? `set ${memberName}`
							: memberName;
				md += `### \`${prefix}\`\n\n`;
				md += renderJsDoc(jsDocOf(member), knownNames);
				md += renderSignatureBlock([signatureText(source, member)]);
			}
		}

		for (const staticMember of entry.staticMembers ?? []) {
			md += `### \`${name}.${staticMember.name}\`\n\n`;
			md += renderJsDoc(jsDocOf(staticMember.statement), knownNames);

			const start = staticMember.statement.getStart(source);
			const body = staticMember.rhs.body;
			const end = body ? body.getStart(source) : staticMember.statement.getEnd();
			let text = source.text.slice(start, end).trimEnd();
			text = text.replace(/[{:]$/, "").trimEnd();
			if (!text.endsWith(";")) {
				text += ";";
			}
			md += renderSignatureBlock([text]);
		}

		const namespace = namespacesByName.get(name);
		if (namespace?.body && ts.isModuleBlock(namespace.body)) {
			const typeMembers = namespace.body.statements.filter(ts.isTypeAliasDeclaration);
			if (typeMembers.length > 0) {
				md += `### Associated types\n\n`;
				md += renderSignatureBlock(typeMembers.map(t => t.getText(source)));
			}
		}
	}

	return entities.length > 0 ? `${md.trimEnd()}\n` : undefined;
}

mkdirSync(outDir, {recursive: true});
for (const existing of readdirSync(outDir)) {
	if (existing.endsWith(".generated.mdx")) {
		rmSync(join(outDir, existing));
	}
}

const files = readdirSync(utilsDir).filter(f => f.endsWith(".ts"));
const parsedFiles = files.map(parseFile).filter(f => f.entities.length > 0);
const knownNames = new Set(parsedFiles.flatMap(f => f.entities.map(e => e.name)));
const generated = [];

for (const parsed of parsedFiles) {
	const md = renderFile(parsed, knownNames);
	if (!md) {
		continue;
	}
	const utilName = basename(parsed.fileName, ".ts").replace(/\.svelte$/, "");
	const mdxPath = join(outDir, `${utilName}.generated.mdx`);
	const mdx = `import {Meta} from "@storybook/addon-docs/blocks";\n\n<Meta title="Utils/${utilName}" />\n\n${md}`;
	writeFileSync(mdxPath, mdx);
	generated.push(utilName);
}

// oxlint-disable-next-line no-console
console.log(`Generated docs for ${generated.length} util(s): ${generated.join(", ")}`);
