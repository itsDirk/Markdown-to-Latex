export function replaceRegex(content, regex, sliceStart, sliceEnd,
                             resultStart, resultEnd, replaceContent = null, replacedContent = null) {
    let matches = content.matchAll(regex);
    for (const match of matches) {
        let result = match[0].slice(sliceStart, sliceEnd);
        if (replaceContent !== null && replacedContent !== null) {
            result = result.replaceAll(replaceContent, replacedContent);
        }
        result = resultStart + result + resultEnd;
        content = content.replace(match[0], result);
    }
    return content;
}

export function toKebabCase(content) {
    return content.toLowerCase().replaceAll(" ", "-");
}