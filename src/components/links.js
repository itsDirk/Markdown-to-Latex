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