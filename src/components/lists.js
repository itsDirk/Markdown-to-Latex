export function replaceLists(content) {
    // Replace bullet-point list made with - or * and tab
    content = replaceList(false, content);
    // Replace ordered list made with 1. 2. etc.
    content = replaceList(true, content);
    return content;
}

function replaceList(isOrdered, content, dept = 0) {
    let matches;
    if (isOrdered) {
        matches = content.matchAll(/(\n(\t)*(\d+)\. .+)+/g);
    } else {
        matches = content.matchAll(/(\n(\t)*[-*] .+)+/g)
    }

    for (const match of matches) {
        let rows = match[0].split("\n");
        let currentGroup = [];
        let result = "";

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i]
            let newDept = row.match(/\t/g)?.length || 0;
            if (dept < newDept) {
                currentGroup.push(row);
            } else if (dept === newDept) {
                if (currentGroup.length > 0) {
                    result += replaceList(isOrdered, "\n" + currentGroup.join("\n"), dept + 1);
                    currentGroup = [];
                }
                if (isOrdered) {
                    row = row.replace(/(\d+)\. /, `\n${"\t".repeat(dept + 1)}\\item `);
                } else {
                    row = row.replace(/[-*] /, `\n${"\t".repeat(dept + 1)}\\item `);
                }
                result += row;
            }
            if (i === rows.length - 1 && currentGroup.length > 0) {
                result += replaceList(isOrdered, "\n" + currentGroup.join("\n"), dept + 1);
            }
        }
        if (isOrdered) {
            result = `\n${"\t".repeat(dept)}\\begin{enumerate}` +
                `${result}\n${"\t".repeat(dept)}\\end{enumerate}`;
        } else {
            result = `\n${"\t".repeat(dept)}\\begin{itemize}` +
                `${result}\n${"\t".repeat(dept)}\\end{itemize}`;
        }

        content = content.replace(match[0], result);
    }
    return content;
}