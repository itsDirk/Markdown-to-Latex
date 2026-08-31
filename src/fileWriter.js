import fs from "fs";

export function writeFile(path, content) {
    if (!path) {
        console.error("No file path specified");
    }

    if (!fs.existsSync(path)) {
        console.error(`File at "${path}" not found`);
    }

    fs.writeFileSync(path, content);
}