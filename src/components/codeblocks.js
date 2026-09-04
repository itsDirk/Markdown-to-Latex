export function removeCodeBlocks(content) {
    let codeLines = [];
    content = content.replace(/(?<!`)`(?!`)(.*?)(?<!`)`(?!`)/g, match => {
        const id = codeLines.length;
        const code = match.slice(1, -1);
        codeLines.push(`\\texttt{${code}}`);
        return `=CODE=LINE=${id}=`;
    });

    let codeBlocks = [];
    content = content.replace(/```.*?```/gs, match => {
        const id = codeBlocks.length;
        const code = match.slice(3, -3);
        codeBlocks.push(`\\begin{verbatim}${code}\\end{verbatim}`);
        return `=CODE=BLOCK=${id}=`;
    });

    return {content, codeLines, codeBlocks};
}

export function restoreCodeBlocks(content, codeLines, codeBlocks) {
    content = content.replace(/=CODE=BLOCK=(\d+)=/g, (_, id) => {
        return codeBlocks[id];
    });
    content = content.replace(/=CODE=LINE=(\d+)=/g, (_, id) => {
        return codeLines[id];
    });

    return content;
}