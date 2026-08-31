export function convertToLatex(content) {
    content = initialize(content);

    return content;
}

function initialize(content) {
    content =
        `\\documentclass[a4paper]{article}\n` +
        `\\begin{document}\n` +
        content + `\n` +
        `\\end{document}`;

    return content;
}