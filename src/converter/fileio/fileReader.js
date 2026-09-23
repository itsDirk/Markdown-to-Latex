import fs from "fs";
import {consoleError} from "../logger.js";

export function readFile(path) {
    if (!path) {
        consoleError("No file path specified");
        return;
    }

    if (!fs.existsSync(path)) {
        consoleError(`File at "${path}" not found`);
        return;
    }

    const data = fs.readFileSync(path);
    return String(data);
}