export function convertToLatex(content) {
    content = replaceSection(content);
    content = replaceSubsection(content);
    content = initialize(content);
    return content;
}

function initialize(content) {
    content =
        `\\documentclass[a4paper]{article}\n` +
        `\\begin{document}\n` +
        content + `\n` +
        `\\end{document}`;

    return content;
}

function replaceSection(content) {
    const regex = new RegExp(/([^#]# .*\n)/g);
    let matches = content.match(regex);

    for (const match of matches) {
        let result = match.slice(2, -1);
        result = result.replace(/#/g, "");
        result = `\\section\{${result}\}\n`;

        content = content.replace(match, result);
    }
    return content;
}

function replaceSubsection(content) {
    const regex = new RegExp(/([^#]## .*\n)/g);
    let matches = content.match(regex);

    for (const match of matches) {
        let result = match.slice(2, -1);
        result = result.replace(/#/g, "");
        result = `\\subsection\{${result}\}\n`;

        content = content.replace(match, result);
    }
    return content;
}