import {toKebabCase} from "../utils.js";

export function replaceSections(content) {
    // Replace ###### Title with \textbf{Title}
    content = replaceSection(content, /(?<=\n|^)###### .*?(\n|$)/g, 7, "\\textbf");
    // Replace ##### Title with \subparagraph{Title}
    content = replaceSection(content, /(?<=\n|^)##### .*?(\n|$)/g, 6, "\\subparagraph");
    // Replace #### Title with \paragraph{Title}
    content = replaceSection(content, /(?<=\n|^)#### .*?(\n|$)/g, 5, "\\paragraph");
    // Replace ### Title with \subsubsection{Title}
    content = replaceSection(content, /(?<=\n|^)### .*?(\n|$)/g, 4, "\\subsubsection");
    // Replace ## Title with \subsection{Title}
    content = replaceSection(content, /(?<=\n|^)## .*?(\n|$)/g, 3, "\\subsection");
    // Replace # Title with \section{Title}
    content = replaceSection(content, /(?<=\n|^)# .*?(\n|$)/g, 2, "\\section");
    return content;
}

export function replaceSection(content, regex, sliceStart, latexCommand) {
    let matches = content.matchAll(regex);
    for (const match of matches) {
        let result = match[0].slice(sliceStart, 999);
        result = result.replaceAll(/\n/g, "");
        let label = toKebabCase(result);
        result = `${latexCommand}{${result}} \\label{${label}}\n`;
        content = content.replace(match[0], result);
    }
    return content;
}