export function escapeRegexPart(string: string): string {
	return string.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}
