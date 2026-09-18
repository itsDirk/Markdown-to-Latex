export function replaceQuotes(content, dept = 0) {
    let matches = content.matchAll(/(?<=\n|^) {0,3}>.*?\n([^\n#]+?(\n|$))*/g);

    for (const match of matches) {
        let result = match[0];
        let lines = result.split("\n");

        lines = lines.map((line) => {
            line = line.trimStart();
            line = line.replace(">", "");
            line = line.trimStart();
            return line;
        });

        result = lines.join(`\n`);

        if (result.endsWith("\n")) result = result.slice(0, -1);

        result = `\n\\begin{quote}\n` +
            `${result}\n` +
            `\\end{quote}`;
        content = content.replace(match[0], result);
    }
    return content;
}