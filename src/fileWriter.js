import fs from "fs";

export function writeFile(path, content) {
    if (!path) {
        console.error("No file path specified");
        return;
    }

    if (!fs.existsSync(path)) {
        console.warn(`File at "${path}" not found`);

        const paths = path.split("/");
        const fileName = paths[paths.length-1];
        const newPath = path.replace(fileName,"");

        console.log(`Creating new file "${fileName}" at ${newPath}`);
    }

    fs.writeFileSync(path, content);
}