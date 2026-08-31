export function convertToLatex(content) {
    content = replaceSubsubsection(content);
    content = replaceSubsection(content);
    content = replaceSection(content);
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
    const regex = new RegExp(/# .*\n/g);
    let matches = content.matchAll(regex);

    for (const match of matches) {
        let result = match[0].slice(2, -1);
        result = result.replace(/#/g, "");
        result = `\\section\{${result}\}\n`;

        content = content.replace(match[0], result);
    }
    return content;
}

function replaceSubsection(content) {
    const regex = new RegExp(/## .*\n/g);
    let matches = content.matchAll(regex);

    for (const match of matches) {
        let result = match[0].slice(3, -1);
        result = result.replace(/#/g, "");
        result = `\\subsection\{${result}\}\n`;

        content = content.replace(match[0], result);
    }
    return content;
}

function replaceSubsubsection(content) {
    const regex = new RegExp(/### .*\n/g);
    let matches = content.matchAll(regex);

    for (const match of matches) {
        let result = match[0].slice(4, -1);
        result = result.replace(/#/g, "");
        result = `\\subsubsection\{${result}\}\n`;

        content = content.replace(match[0], result);
    }
    return content;
}