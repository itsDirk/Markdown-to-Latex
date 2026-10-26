import {toLabelCase} from "../utils.js";

export function replaceLinks(content) {
    content = replaceInlineLink(content);
    content = replaceUrlText(content);
    content = replaceRefLink(content);
    return content;
}

function replaceUrlText(content) {
    // Official url regex (https://uibakery.io/regex-library/url)
    const regex = /(?<=^|\s)https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,63}\b([-a-zA-Z0-9()@:%_+.~#?&\/=]*)(?=$|\s)/g;

    return content.replace(regex, (match) => {
        return `\\href{${match.trim()}}{${match.trim()}}`
    });
}

function replaceInlineLink(content) {
    // Replace [Display text](address) with \href{address}{Display text}
    let matches = content.matchAll(/\[.*?]\(.*?\)/g);

    for (const match of matches) {
        let result = match[0].slice(1, -1);
        let text = result.split("](")[0];
        let dest = result.split("](")[1].trim();

        if (!text.trim() || !dest) continue;

        // [Display text](#address)
        if (dest.startsWith("#")) {
            dest = dest.slice(1);
            dest = toLabelCase(dest);
            result = `\\hyperref[${dest}]{${text}}`;
        } else {
            // [Display text](address)
            result = `\\href{${dest}}{${text}}`;
        }
        content = content.replace(match[0], result);
    }
    return content;
}

function replaceRefLink(content) {
    // Replace [[#Ref 1]] with \hyperref[ref-1]{Ref 1}
    let matches = content.matchAll(/\[\[#.+?]]/g);

    for (const match of matches) {
        let result = match[0].slice(3, -2);
        let dest = result.trim();
        if (!dest) continue;
        let text = dest;

        // [[#Ref 1|Link to ref 1]]
        if (/^.*?\|.*$/.test(result)) {
            dest = result.split("|")[0].trim();
            if (!dest) continue;
            text = result.replace(`${dest}|`, "");
        }

        dest = toLabelCase(dest);
        result = `\\hyperref[${dest}]{${text}}`;
        content = content.replace(match[0], result);
    }
    return content;
}