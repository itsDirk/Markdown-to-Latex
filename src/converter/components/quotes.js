export function replaceQuotes(content) {
    let matches = content.matchAll(/\n[\t ]*(>.*?\n)+/g);

    for (const match of matches) {
        let result = match[0].slice(1,-1);
        let lines = result.split("\n");

        lines = lines.map((line) => {
            line = line.trimStart();
            line = line.slice(1);
            line = line.trimStart();
            return line;
        });


        result = lines.join("\n\t");
        result = `\n\\begin{quote}\n` +
            `\t${result}\n` +
            `\\end{quote}\n`;
        content = content.replace(match[0], result);
    }
    return content;
}