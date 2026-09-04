import {setUseLinks, setUseImages, setUseMath, useLinks, useImages, useMath} from "./config.js";
import {replaceComments} from "./components/comments.js";
import {replaceLists} from "./components/lists.js";
import {removeCodeBlocks, restoreCodeBlocks} from "./components/codeblocks.js";
import {replaceSections} from "./components/sections.js";
import {replaceTextStyling} from "./components/styling.js";
import {replaceHyperLink} from "./components/links.js";
import {replaceImages} from "./components/images.js";
import {replaceHorizontalLines} from "./components/lines.js";

export function convertToLatex(content) {
    if (!content) {
        return initialize();
    }

    content = replaceComments(content);

    let codeLines, codeBlocks;
    ({content, codeLines, codeBlocks} = removeCodeBlocks(content));

    content = replaceImages(content);
    content = replaceHyperLink(content);
    content = replaceLists(content);
    content = replaceTextStyling(content);
    content = replaceSections(content);
    content = replaceHorizontalLines(content);

    content = cleanContent(content);
    content = restoreCodeBlocks(content, codeLines, codeBlocks);
    content = initialize(content);
    return content;
}

export function replaceRegex(content, regex, sliceStart, sliceEnd,
                      resultStart, resultEnd, replaceContent = null, replacedContent = null) {
    let matches = content.matchAll(regex);
    for (const match of matches) {
        let result = match[0].slice(sliceStart, sliceEnd);
        if (replaceContent && replacedContent) {
            result = result.replaceAll(replaceContent, replacedContent);
        }
        result = `${resultStart}${result}${resultEnd}`;
        content = content.replace(match[0], result);
    }
    return content;
}

function findUsedPackages(content) {
    if (new RegExp(/\\href{.*?}{.*?}/).test(content)) {
        setUseLinks(true);
    }
    if (new RegExp(/\$.*?\$/).test(content)) {
        setUseMath(true);
    }
    if (new RegExp(/\\includegraphics/).test(content)) {
        setUseImages(true);
    }
}

function initialize(content) {
    findUsedPackages(content);

    let output = `\\documentclass[a4paper]{article}\n`;
    if (useLinks) output += `\\usepackage[colorlinks=true, urlcolor=blue, linkcolor=red]{hyperref}\n`;
    if (useMath) output += `\\usepackage{amsmath}\n`;
    if (useImages) output += `\\usepackage{graphicx}\n`;
    output += `\\begin{document}\n${content}\n\\end{document}`;

    return output;
}



function cleanContent(content) {
    content = content.replaceAll("​", "");
    content = content.replaceAll("\\[", "[");
    content = content.replaceAll("\\]", "]");
    content = content.replaceAll("\\%", "%");
    content = content.replaceAll("%", "\\%");
    return content;
}