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
        // Ordered list regex
        matches = content.matchAll(/(\n([\t ])*(\d+)\. .+)+/g);
    } else {
        // Unordered list regex
        matches = content.matchAll(/(\n([\t ])*[-*+] .+)+/g);
    }

    for (const match of matches) {
        // Remove first char before split to prevent empty row
        let rows = match[0].slice(1).split("\n");
        let currentGroup = [];
        let result = "";

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i]
            // Match text in front of marker and count the number of tabs/4 spaces
            let newDept = (row.match(/[\t ]*(\d+\.|[-*+])/g)[0].match(/\t|( {4})/g)?.length || 0);
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
                    row = row.replace(/[-*+] /, `\n${"\t".repeat(dept + 1)}\\item `);
                }
                result += row;
            }
            if (i === rows.length - 1 && currentGroup.length > 0) {
                result += replaceList(isOrdered, "\n" + currentGroup.join("\n"), dept + 1);
            }
        }

        const listType = isOrdered ? "enumerate" : "itemize";
        result = `\n${"\t".repeat(dept)}\\begin{${listType}}` +
            `${result}\n${"\t".repeat(dept)}\\end{${listType}}`;

        content = content.replace(match[0], result);
    }
    return content;
}