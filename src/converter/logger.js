const colors = {
    info: '\x1b[38;2;188;190;196]',
    warn: '\x1b[33m',
    error: '\x1b[31m',
    reset: '\x1b[0m'
};

function log(lvl, msg) {
    let messages = [msg];
    if (typeof msg === "string") {
        messages = msg.split("\n");
    }
    for (let message of messages) {
        console.log(`${colors[lvl]}[${lvl.toUpperCase()}] ${message}${colors.reset}`);
    }

}

function logTest() {
    consoleLog("Something normal");
    consoleWarn("Something suspicious");
    consoleError("Something bad");
}

export const consoleWrite = (msg) => log('info', msg);
export const consoleLog = (msg) => log('info', msg);
export const consoleWarn = (msg) => log('warn', msg);
export const consoleError = (msg) => log('error', msg);

// logTest();