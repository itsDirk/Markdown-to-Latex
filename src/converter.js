export function convertToLatex(content) {
    if (!content) {
        return initialize();
    }

    content = sanitizeContent(content);

    content = replaceComments(content);

    let codeLines, codeBlocks;
    ({content, codeLines, codeBlocks} = removeCodeBlocks(content));

    content = replaceImage(content);
    content = replaceImageCaption(content);
    content = replaceHyperLink(content);
    content = replaceUnorderedList(content);
    content = replaceOrderedList(content);
    content = replaceRegex(content, /\*\*.*?\*\*/g, 2, -2, "\\textbf{", "}");
    content = replaceRegex(content, /\*.*?\*/g, 1, -1, "\\textit{", "}");
    content = replaceRegex(content, /__.*?__/g, 2, -2, "\\textbf{", "}");
    content = replaceRegex(content, /_.*?_/g, 1, -1, "\\textit{", "}");
    content = replaceRegex(content, /~~.*?~~/g, 2, -2, "\\underline{", "}");
    content = replaceSection(content, /### .*?(?:\n|$)/g, 4, -1, "\\subsubsection{", "}\n");
    content = replaceSection(content, /## .*?(?:\n|$)/g, 3, -1, "\\subsection{", "}\n");
    content = replaceSection(content, /# .*?(?:\n|$)/g, 2, -1, "\\section{", "}\n");
    content = replaceRegex(content, /(?:\n|^) *--- *(?:\n|$)/g, 999, 0, "\\par\\noindent\\rule{\\textwidth}{0.4pt}\n", "");

    content = restoreCodeBlocks(content, codeLines, codeBlocks);

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

function replaceRegex(content, regex, sliceStart, sliceEnd, resultStart, resultEnd, lineBreaker = "\n") {
    let matches = content.matchAll(regex);
    for (const match of matches) {
        let result = match[0].slice(sliceStart, sliceEnd);
        result = result.replaceAll("\n", lineBreaker);
        result = `${resultStart}${result}${resultEnd}`;
        content = content.replace(match[0], result);
    }
    return content;
}

function replaceSection(content, regex, sliceStart, sliceEnd, resultStart, resultEnd) {
    let matches = content.matchAll(regex);
    for (const match of matches) {
        let result = match[0].slice(sliceStart, sliceEnd);
        result = result.replace(/(?<!\\)#/g, "\\\#");
        result = `${resultStart}${result}${resultEnd}`;
        content = content.replace(match[0], result);
    }
    return content;
}

function initialize(content) {
    content =
        `\\documentclass[a4paper]{article}\n` +
        `\\usepackage[colorlinks=true, urlcolor=blue, linkcolor=red]{hyperref}\n` +
        `\\usepackage{amsmath}\n` +
        `\\usepackage{graphicx}\n` +
        `\\begin{document}\n` +
        content + `\n` +
        `\\end{document}`;
    return content;
}

function replaceComments(content) {
    // Comments in Obsidian
    content = replaceRegex(content, /%%.*?%%/gs, 2, -2, "%", "\n", "\n%");
    // Comments in JetBrains IDE's
    content = replaceRegex(content, /\n\n\[\/\/]: # (.*?)/g, 10, -1, "\n\n%", "", "\n%");
    // Comments in Visual Studio Code
    content = replaceRegex(content, /<!-- ?.*? ?-->/gs, 4, -3, "%", "", "\n%");
    return content
}

function removeCodeBlocks(content) {
    let codeLines = [];
    content = content.replace(/(?<!`)`(?!`)(.*?)(?<!`)`(?!`)/g, match => {
        const id = codeLines.length;
        const code = match.slice(1, -1);
        codeLines.push(`\\texttt{${code}}`);
        return `%#%CODE=LINE=${id}%#%`;
    });

    let codeBlocks = [];
    content = content.replace(/```.*?```/gs, match => {
        const id = codeBlocks.length;
        const code = match.slice(3, -3);
        codeBlocks.push(`\\begin{verbatim}${code}\\end{verbatim}`);
        return `%#%CODE=BLOCK=${id}%#%`;
    });

    return {content, codeLines, codeBlocks};
}

function restoreCodeBlocks(content, codeLines, codeBlocks) {
    content = content.replace(/%#%CODE=BLOCK=(\d+)%#%/g, (_, id) => {
        return codeBlocks[id];
    });
    content = content.replace(/%#%CODE=LINE=(\d+)%#%/g, (_, id) => {
        return codeLines[id];
    });

    return content;
}

function replaceUnorderedList(content) {
    const matches = content.matchAll(/(\n[-*] .+)+/g);

    for (const match of matches) {
        let result = match[0].replaceAll(/\n[-*] /g, `\n\t\\item `);
        result = `\n\\begin{itemize}${result}\n\\end{itemize}`;
        content = content.replace(match[0], result);
    }
    return content;
}

function replaceOrderedList(content) {
    const matches = content.matchAll(/(\n(\d+)\. .+)+/g);

    for (const match of matches) {
        let result = match[0].replace(/\n(\d+)\. /g, `\n\t\\item `);
        result = `\n\\begin{enumerate}${result}\n\\end{enumerate}`;
        content = content.replace(match[0], result);
    }
    return content;
}

function replaceImage(content) {
    const matches = content.matchAll(/!\[\[.+?]]/g);

    for (const match of matches) {
        let path = match[0].slice(3, -2);
        let scale = 1;
        if (new RegExp(/.+\|(\d+)/).test(path)) {
            let size = path.split("|")[1];
            path = path.split("|")[0];
            scale = (size / 700).toFixed(3);
        }
        let result = `\\begin{figure}\n\t\\centering` +
            `\n\t\\includegraphics[width=${scale}\\linewidth]{${path}}` +
            `\n\\end{figure}`
        content = content.replace(match[0], result);
    }
    return content;
}

function replaceImageCaption(content) {
    const matches = content.matchAll(/!\[.*]\(.+?\)/g);

    for (const match of matches) {
        let path = match[0].slice(2, -1);
        let altText = path.split("](")[0];
        path = path.split("](")[1];

        let caption;

        if (new RegExp(/!\[.*]\(.+? ".*"\)/).test(match[0])) {
            caption = path.split(" \"")[1].slice(0, -1);
            path = path.split(" \"")[0];
        }

        let scale = 1;
        if (new RegExp(/.+?\|(\d+)/).test(altText)) {
            let size = altText.split("|")[1];
            altText = altText.split("|")[0];
            scale = (size / 700).toFixed(3);
        } else if (new RegExp(/^\|?(\d+)$/).test(altText)) {
            let size = altText.replace("|", "");
            altText = altText.replace(size, "");
            scale = (size / 700).toFixed(3);
        }

        let result = `\\begin{figure}\n\t\\centering` +
            `\n\t\\includegraphics[width=${scale}\\linewidth]{${path}}`;
        if (caption) {
            result += `\n\t\\caption{${caption}}`;
        } else if (altText) {
            result += `\n\t\\caption{${altText}}`;
        }
        result += `\n\\end{figure}`;

        content = content.replace(match[0], result);
    }
    return content;
}

function sanitizeContent(content) {
    return content.replaceAll("​","");
}