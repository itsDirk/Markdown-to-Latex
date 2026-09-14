import {toKebabCase} from "../utils.js";

export function replaceLinks(content) {
    content = replaceRefLink(content);
    content = replaceHyperLink(content);
    return content;
}

export function replaceHyperLink(content) {
    // Replace [Display text](address) with \href{address}{Display text}
    let regex = new RegExp(/\[.*?]\(.*?\)/g);
    let matches = content.matchAll(regex);

    for (const match of matches) {
        let result = match[0].slice(1, -1);
        let text = result.split("](")[0];
        let dest = result.split("](")[1];

        // [Display text](#address)
        if (dest.startsWith("#")) {
            dest = dest.slice(1);
            result = `\\hyperref[${dest}]{${text}}`;
        } else {
            result = `\\href{${dest}}{${text}}`;
        }
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