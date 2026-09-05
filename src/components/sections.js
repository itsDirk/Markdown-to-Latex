import {replaceRegex} from "../converter.js";

export function replaceSections(content) {
    // Replace ### Title with \subsubsection{Title}
    content = replaceRegex(content, /### .*?(?:\n|$)/g, 4, -1, "\\subsubsection{", "}\n", /(?<!\\)#/g, "\\\#");
    // Replace ## Title with \subsection{Title}
    content = replaceRegex(content, /## .*?(?:\n|$)/g, 3, -1, "\\subsection{", "}\n", /(?<!\\)#/g, "\\\#");
    // Replace # Title with \section{Title}
    content = replaceRegex(content, /# .*?(?:\n|$)/g, 2, -1, "\\section{", "}\n", /(?<!\\)#/g, "\\\#");
    return content;
}