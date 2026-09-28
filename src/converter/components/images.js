import {config} from "../config.js";
import {generateLabel} from "../utils.js";

export function replaceImages(content) {
    // ![[image.png]]
    content = replaceImage(content);
    // ![Alt Text](image.png "Image caption")
    content = replaceImageCaption(content);
    return content;
}

function replaceImage(content) {
    // ![[image.png]]
    const matches = content.matchAll(/!\[\[.+?]]/g);

    for (const match of matches) {
        let path = match[0].slice(3, -2);
        let scale = 1;
        // ![[image.png|123]]
        if (new RegExp(/.+\|(\d+)/).test(path)) {
            let size = path.split("|")[1];
            path = path.split("|")[0];
            scale = (size / 700).toFixed(3);
        }
        const float = config.image.float;
        const align = config.image.align;
        const label = getLabelFromPath(path);

        let result = `\\begin{figure}[${float}]\n` +
            `\t\\${align}\n` +
            `\t\\includegraphics[width=${scale}\\linewidth]\n` +
            `\t{${path}}\n` +
            `\t\\label{${label}}\n` +
            `\\end{figure}`
        content = content.replace(match[0], result);
    }
    return content;
}

function replaceImageCaption(content) {
    // ![Alt Text](image.png "Image caption")
    const matches = content.matchAll(/!\[.*]\(.+?\)/g);

    for (const match of matches) {
        let path = match[0].slice(2, -1);
        let altText = path.split("](")[0];
        path = path.split("](")[1];

        let caption;
        if (new RegExp(/!\[.*]\(.+? ".*"\)/).test(match[0])) {
            caption = path.split(" \"")[1].slice(0, -1);
            path = path.split(" \"")[0];
        }

        let scale = 1;
        if (new RegExp(/.+?\|(\d+)/).test(altText)) {
            // ![Alt Text|123](image.png "Image caption")
            let size = altText.split("|")[1];
            altText = altText.split("|")[0];
            scale = (size / 700).toFixed(3);
        } else if (new RegExp(/^\|?(\d+)$/).test(altText)) {
            // ![|123](image.png "Image caption")
            let size = altText.replace("|", "");
            altText = altText.replace(size, "");
            scale = (size / 700).toFixed(3);
        }
        const float = config.image.float;
        const align = config.image.align;
        const label = getLabelFromPath(path);

        let result = `\\begin{figure}[${float}]\n` +
            `\t\\${align}\n` +
            `\t\\includegraphics[width=${scale}\\linewidth]\n` +
            `\t{${path}}\n` +
            `\t\\label{${label}}\n`;

        if (caption) {
            result += `\t\\caption{${caption}}\n`;
        } else if (altText) {
            result += `\t\\caption{${altText}}\n`;
        }
        result += `\\end{figure}`;

        content = content.replace(match[0], result);
    }
    return content;
}

function getLabelFromPath(path) {
    let dirs = path.split("/");
    let label = dirs[dirs.length - 1];
    let extensions = label.split(".");
    label = label.replace(extensions[extensions.length - 1], "");
    return generateLabel(label);
}