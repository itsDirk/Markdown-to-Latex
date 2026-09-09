import {replaceRegex} from "../converter.js";

export function replaceSections(content) {
    // Replace ### Title with \subsubsection{Title}
    content = replaceRegex(content, /### .*?(\n|$)/g, 4, 999, "\\subsubsection{", "}\n", /\n/g, "");
    // Replace ## Title with \subsection{Title}
    content = replaceRegex(content, /## .*?(\n|$)/g, 3, 999, "\\subsection{", "}\n", /\n/g, "");
    // Replace # Title with \section{Title}
    content = replaceRegex(content, /# .*?(\n|$)/g, 2, 999, "\\section{", "}\n", /\n/g, "");
    return content;
}