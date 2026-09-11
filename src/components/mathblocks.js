export function removeMathBlocks(content) {
    // Store and replace $$math$$ with =MATH=BLOCK=0= temporarily
    let mathBlocks = [];
    content = content.replace(/\$\$.*?\$\$/gs, match => {
        const id = mathBlocks.length;
        const code = match.slice(2, -2);
        mathBlocks.push(`\$\$${code}\$\$`);
        return `=MATH=BLOCK=${id}=`;
    });

    // Store and replace $math$ with =MATH=LINE=0= temporarily
    let mathLines = [];
    content = content.replace(/\$.*?\$/g, match => {
        const id = mathLines.length;
        const code = match.slice(1, -1);
        mathLines.push(`\$${code}\$`);
        return `=MATH=LINE=${id}=`;
    });

    return {content, mathLines, mathBlocks};
}

export function restoreMathBlocks(content, mathLines, mathBlocks) {
    // Replace =MATH=LINE=0= with the original string
    content = content.replace(/=MATH=LINE=(\d+)=/g, (_, id) => {
        return mathLines[id];
    });

    // Replace =MATH=BLOCK=0= with the original string
    content = content.replace(/=MATH=BLOCK=(\d+)=/g, (_, id) => {
        return mathBlocks[id];
    });

    return content;
}