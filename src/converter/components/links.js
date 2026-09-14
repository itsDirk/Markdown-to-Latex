export function replaceLinks(content) {
    content = replaceHyperLink(content);
    content = replaceRefLink(content);
    return content;
}

export function replaceHyperLink(content) {
    // Replace [Display text]{address} with \href{address}{Display text}
    let regex = new RegExp(/\[.*?]\(.*?\)/g);
    let matches = content.matchAll(regex);

    for (const match of matches) {
        let result = match[0].slice(1, -1);
        let results = result.split("](");
        result = `\\href{${results[1]}}{${results[0]}}`;
        content = content.replace(match[0], result);
    }
    return content;
}

function replaceRefLink(content) {
    // Replace [[#Ref 1]] with \hyperref[ref-1]{Ref 1}
    let regex = new RegExp(/\[\[#.+?]]/g);
    let matches = content.matchAll(regex);

    for (const match of matches) {
        let result = match[0].slice(3, -2);
        let refName = result;
        let refText = result;

        // [[#Ref 1|Link to ref 1]]
        if (/^.+?\|.*$/.test(result)) {
            refName = result.split("|")[0];
            refText = result.replace(`${refName}|`, "");
        }

        refName = toKebabCase(refName);
        result = `\\hyperref[${refName}]{${refText}}`;
        content = content.replace(match[0], result);
    }
    return content;
}

function toKebabCase(content) {
    return content.toLowerCase().replace(" ", "-");
}