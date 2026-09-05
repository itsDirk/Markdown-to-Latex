export function replaceImages(content) {
    // ![[image.png]]
    content = replaceImage(content);
    // ![Alt Text](image.png "Image caption")
    content = replaceImageCaption(content);
    return content;
}

function replaceImage(content) {
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
        let result = `\\begin{figure}\n\t\\centering` +
            `\n\t\\includegraphics[width=${scale}\\linewidth]{${path}}` +
            `\n\\end{figure}`
        content = content.replace(match[0], result);
    }
    return content;
}

function replaceImageCaption(content) {
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

        let result = `\\begin{figure}\n\t\\centering` +
            `\n\t\\includegraphics[width=${scale}\\linewidth]{${path}}`;
        if (caption) {
            result += `\n\t\\caption{${caption}}`;
        } else if (altText) {
            result += `\n\t\\caption{${altText}}`;
        }
        result += `\n\\end{figure}`;

        content = content.replace(match[0], result);
    }
    return content;
}