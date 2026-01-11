export function escapeRegexPart(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}
