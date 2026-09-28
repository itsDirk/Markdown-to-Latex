import {config} from "../config.js";

export function replaceTables(content) {
    let matches = content.matchAll(/((?<=\n|^)\|.*\|)(\n\|( *-+ *\|)+)(\n\|.*\|)*/g)

    for (const match of matches) {
        let headers = match[1];
        let divider = match[2];
        let table = match[0].replace(headers, "").replace(divider, "");

        headers = headers.slice(2, -1).split(" | ");
        headers = headers.map((header) => header.trim()); // Remove leading and trailing spaces
        // "<br>" are replaced with "\\". If a cell contains these, wrap them in \shortstack{} to format them properly
        headers = headers.map((header) => header.includes("\\\\") ? `\\shortstack{${header}}` : header);
        // If headers are configured to be in boldface, wrap them in \textbf{}
        if (config.table.headersBold) headers = headers.map((header) => `\\textbf{${header}}`);

        let rows = table.split("\n");
        rows.shift(); // Remove first
        let result = `\t\\hline\n\t${headers.join(" & ")} \\\\\n\t\\hline\n`;
        for (const row of rows) {
            let cells = row.slice(1, -1).split(" | ");
            cells = cells.map((cell) => cell.trim());
            cells = cells.join(" & ");
            result += `\t${cells} \\\\\n`;
            if (config.table.outlineRows) result += `\t\\hline\n`;
        }
        if (rows.length > 0 && !config.table.outlineRows) result += "\t\\hline\n";
        if (rows.length > 0 && config.table.repeatHeaders) result += `\t${headers.join(" & ")} \\\\\n\t\\hline\n`;

        const alignment = config.table.align;
        const contentAlignment = config.table.alignContent[0];
        const float = config.table.float;

        let tableStructure;
        if (config.table.outlineColumns) {
            tableStructure = `|${contentAlignment}`.repeat(headers.length) + "|";
        } else {
            tableStructure = `|` + contentAlignment.repeat(headers.length) + "|";

        }

        result = `\\begin{table}[${float}]\n` +
            `\\${alignment}\n` +
            `\\begin{tabular}{${tableStructure}}\n` +
            result +
            `\\end{tabular}\n` +
            `\\end{table}`;
        content = content.replace(match[0], result);
    }

    return content;
}