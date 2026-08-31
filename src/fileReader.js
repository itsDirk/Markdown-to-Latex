import fs from "fs";

export function readFile(path) {
    if (!path) {
        console.error("No file path specified");
        return;
    }

    if (!fs.existsSync(path)) {
        console.error(`File at "${path}" not found`);
        return;
    }

    console.log(`Reading content of file at ${path}`);
    const data = fs.readFileSync(path);
    return String(data);
}