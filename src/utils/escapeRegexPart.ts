/**
 * Escapes regex special characters in `string` so it can be safely embedded inside a `RegExp`
 * pattern and matched literally.
 *
 * @param string Arbitrary text to embed literally in a regex.
 * @returns `string` with every regex metacharacter (`. * + ? ^ $ { } ( ) | [ ] \`) escaped.
 *
 * @example
 * ```ts
 * const search = "a.b*c";
 * new RegExp(escapeRegexPart(search)).test("a.b*c"); // true
 * new RegExp(search).test("aXbYc"); // also true - without escaping, `.` and `*` are wildcards
 * ```
 */
export function escapeRegexPart(string: string): string {
	return string.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}
