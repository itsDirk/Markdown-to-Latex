import {config} from "./config.js";

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

export function generateLabel(title) {
    title = toKebabCase(title);
    let newLabel = title;
    let id = 1;
    while (config.labels.includes(newLabel)) {
        newLabel = `${title}-${id}`;
        id++;
    }
    config.labels.push(newLabel);

    return newLabel;
}

export function toKebabCase(content) {
    content = content.toLowerCase().trim();
    content = content.replaceAll(/[^A-Za-z0-9 ._{}-]/g, "");
    content = content.replaceAll(/[ ._{}]/g, "-");
    content = content.replaceAll(/^-|-$/g, "");
    content = content.replaceAll(/-{2,}/g, "-");
    return content;
}