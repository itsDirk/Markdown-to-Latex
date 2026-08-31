export function convertToLatex(content) {
    content = replaceLink(content);
    content = replaceRegex(content, /`.*?`/g, 1, -1, "\\texttt\{", "\}");
    content = replaceRegex(content, /\*\*.*?\*\*/g, 2, -2, "\\textbf\{", "\}");
    content = replaceRegex(content, /\*.*?\*/g, 1, -1, "\\textit\{", "\}");
    content = replaceRegex(content, /### .*?(?:\n|$)/g, 4, -1, "\\subsubsection\{", "\}\n");
    content = replaceRegex(content, /## .*?(?:\n|$)/g, 3, -1, "\\subsection\{", "\}\n");
    content = replaceRegex(content, /# .*?(?:\n|$)/g, 2, -1, "\\section\{", "\}\n");
    content = initialize(content);
    return content;
}

function replaceLink(content) {
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