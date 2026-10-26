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
    const baseLabel = toLabelCase(title);
    let newLabel = baseLabel;
    
    let id = 1;
    while (config.labels.includes(newLabel)) {
        newLabel = `${baseLabel}-${id}`;
        id++;
    }
    config.labels.push(newLabel);
    return newLabel;
}

export function toLabelCase(content) {
    return content.toLowerCase()
        .replaceAll(/[^a-z0-9 _-]/g, "")
        .trim()
        .replaceAll(/[_ ]/g, "-")
        .replaceAll(/^-+|-+$/g, "")
        .replaceAll(/-{2,}/g, "-");
}