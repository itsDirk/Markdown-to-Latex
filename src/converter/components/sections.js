import {replaceRegex} from "../converter.js";

export function replaceSections(content) {
    // Replace ###### Title with \textbf{Title}
    content = replaceRegex(content, /(?<=\n|^)###### .*?(\n|$)/g, 7, 999, "\\textbf{", "}\n", /\n/g, "");
    // Replace ##### Title with \subparagraph{Title}
    content = replaceRegex(content, /(?<=\n|^)##### .*?(\n|$)/g, 6, 999, "\\subparagraph{", "}\n", /\n/g, "");
    // Replace #### Title with \paragraph{Title}
    content = replaceRegex(content, /(?<=\n|^)#### .*?(\n|$)/g, 5, 999, "\\paragraph{", "}\n", /\n/g, "");
    // Replace ### Title with \subsubsection{Title}
    content = replaceRegex(content, /(?<=\n|^)### .*?(\n|$)/g, 4, 999, "\\subsubsection{", "}\n", /\n/g, "");
    // Replace ## Title with \subsection{Title}
    content = replaceRegex(content, /(?<=\n|^)## .*?(\n|$)/g, 3, 999, "\\subsection{", "}\n", /\n/g, "");
    // Replace # Title with \section{Title}
    content = replaceRegex(content, /(?<=\n|^)# .*?(\n|$)/g, 2, 999, "\\section{", "}\n", /\n/g, "");
    return content;
}