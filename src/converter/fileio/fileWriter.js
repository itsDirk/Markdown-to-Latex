import fs from "fs";
import {consoleError, consoleLog, consoleWarn} from "../logger.js";

export function writeFile(path, content) {
    if (!path) {
        consoleError("No file path specified");
        return;
    }

    if (!fs.existsSync(path)) {
        consoleWarn(`File at "${path}" not found`);

        const paths = path.split("/");
        const fileName = paths[paths.length-1];
        const newPath = path.replace(fileName,"");

        consoleLog(`Creating new file "${fileName}" at ${newPath}`);
    }

    fs.writeFileSync(path, content);
}