import fs from "fs";

export function readFile(path) {
    if (!path) {
        console.error("No file path specified");
    }

    if (!fs.existsSync(path)) {
        console.error(`File at "${path}" not found`);
    }

    const data = fs.readFileSync(path);
    return String(data);
}