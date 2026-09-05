export function removeCodeBlocks(content) {
    // Store and replace `code` with =CODE=LINE=0= temporarily
    let codeLines = [];
    content = content.replace(/(?<!`)`(?!`)(.*?)(?<!`)`(?!`)/g, match => {
        const id = codeLines.length;
        const code = match.slice(1, -1);
        codeLines.push(`\\texttt{${code}}`);
        return `=CODE=LINE=${id}=`;
    });

    // Store and replace ```code``` with =CODE=BLOCK=0= temporarily
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
    // Replace =CODE=BLOCK=0= with the original string
    content = content.replace(/=CODE=BLOCK=(\d+)=/g, (_, id) => {
        return codeBlocks[id];
    });

    // Replace =CODE=LINE=0= with the original string
    content = content.replace(/=CODE=LINE=(\d+)=/g, (_, id) => {
        return codeLines[id];
    });

    return content;
}