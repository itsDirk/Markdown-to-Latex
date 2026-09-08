export function replaceTables(content) {
    let matches = content.matchAll(/(\n\|.*\|)(\n\|( *-+ *\|)+)(\n\|.*\|)*/g)

    for (const match of matches) {
        let headers = match[1];
        let divider = match[2];
        let table = match[0].replace(headers, "").replace(divider, "");

        headers = headers.split("|");
        headers.shift(); // Remove first
        headers.pop(); // Remove last
        headers = headers.map((header) => header.trim());
        headers = headers.map((header) => header.includes("\\\\") ? `\\shortstack{${header}}` : header);

        let rows = table.split("\n");
        rows.shift(); // Remove first

        let result = `\t\\hline\n\t${headers.join(" & ")}\\\\\n\t\\hline`;
        for (const row of rows) {
            let cells = row.split("|");
            cells.shift();
            cells.pop();
            cells = cells.map((cell) => cell.trim());
            cells = cells.join(" & ");
            result += `\n\t${cells}\\\\`;
        }
        if (rows.length > 0) result += "\n\t\\hline";

        result = `\n\\begin{center}\n\\begin{tabular}` +
            `{${"|c".repeat(headers.length)}|}\n` +
            result +
            `\n\\end{tabular}\n\\end{center}`;
        content = content.replace(match[0], result);
    }

    return content;
}