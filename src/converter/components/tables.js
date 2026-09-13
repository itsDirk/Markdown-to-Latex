import {config} from "../config.js";

export function replaceTables(content) {
    let matches = content.matchAll(/(\n\|.*\|)(\n\|( *-+ *\|)+)(\n\|.*\|)*/g)

    for (const match of matches) {
        let headers = match[1];
        let divider = match[2];
        let table = match[0].replace(headers, "").replace(divider, "");

        headers = headers.slice(2, -1).split(" | ");
        headers = headers.map((header) => header.trim()); // Remove leading and trailing spaces
        // "<br>" are replaced with "\\". If a cell contains these, wrap them in \shortstack{} to format them properly
        headers = headers.map((header) => header.includes("\\\\") ? `\\shortstack{${header}}` : header);
        if (config.settings.tableHeadersBold) headers = headers.map((header) => `\\textbf{${header}}`);

        let rows = table.split("\n");
        rows.shift(); // Remove first

        let result = `\t\\hline\n\t${headers.join(" & ")} \\\\\n\t\\hline`;
        for (const row of rows) {
            let cells = row.slice(1, -1).split(" | ");
            cells = cells.map((cell) => cell.trim());
            cells = cells.join(" & ");
            result += `\n\t${cells} \\\\`;
            if (config.settings.outlineRows) result += `\n\t\\hline`;
        }
        if (rows.length > 0 && !config.settings.outlineRows) result += "\n\t\\hline";

        let tableStructure;
        if (config.settings.outlineColumns) {
            tableStructure = "|c".repeat(headers.length) + "|";
        } else {
            tableStructure = "|" + "c".repeat(headers.length) + "|";
        }

        result = `\n\\begin{center}\n\\begin{tabular}` +
            `{${tableStructure}}\n` +
            result +
            `\n\\end{tabular}\n\\end{center}`;
        content = content.replace(match[0], result);
    }

    return content;
}