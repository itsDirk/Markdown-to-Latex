export function convertToLatex(content) {
    // Comments in JetBrains IDE's
    content = replaceRegex(content, /\n\n\[\/\/]: # (.*?)/g, 10, -1, "\n\n%", "");
    // Comments in Obsidian
    content = replaceRegex(content, /%%.*?%%/g, 2, -2, "%", "\n");

    let codeLines = [];
    content = content.replace(/(?<!`)`(?!`)(.*?)(?<!`)`(?!`)/g, match => {
        const id = codeLines.length;
        const code = match.slice(1, -1);
        codeLines.push(`\\texttt\{${code}\}`);
        return `%#%CODE_LINE_${id}%#%`;
    });

    let codeBlocks = [];
    content = content.replace(/```.*?```/gs, match => {
        const id = codeBlocks.length;
        const code = match.slice(3, -3);
        codeBlocks.push(`\\begin\{verbatim\}${code}\\end\{verbatim\}`);
        return `%#%CODE_BLOCK_${id}%#%`;
    });

    content = replaceHyperLink(content);
    content = replaceRegex(content, /\*\*.*?\*\*/g, 2, -2, "\\textbf\{", "\}");
    content = replaceRegex(content, /\*.*?\*/g, 1, -1, "\\textit\{", "\}");
    content = replaceRegex(content, /### .*?(?:\n|$)/g, 4, -1, "\\subsubsection\{", "\}\n");
    content = replaceRegex(content, /## .*?(?:\n|$)/g, 3, -1, "\\subsection\{", "\}\n");
    content = replaceRegex(content, /# .*?(?:\n|$)/g, 2, -1, "\\section\{", "\}\n");

    content = content.replace(/%#%CODE_BLOCK_(\d+)%#%/g, (_, id) => {
        return codeBlocks[id];
    });
    content = content.replace(/%#%CODE_LINE_(\d+)%#%/g, (_, id) => {
        return codeLines[id];
    });

    content = initialize(content);
    return content;
}

function replaceHyperLink(content) {
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

function replaceRegex(content, regex, sliceStart, sliceEnd, resultStart, resultEnd) {
    let matches = content.matchAll(regex);
    for (const match of matches) {
        let result = match[0].slice(sliceStart, sliceEnd);
        result = `${resultStart}${result}${resultEnd}`;
        content = content.replace(match[0], result);
    }
    return content;
}

function initialize(content) {
    content =
        `\\documentclass[a4paper]{article}\n` +
        `\\usepackage[colorlinks=true, urlcolor=blue, linkcolor=red]{hyperref}\n` +
        `\\begin{document}\n` +
        content + `\n` +
        `\\end{document}`;
    return content;
}