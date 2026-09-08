export function replaceTables(content) {
    let matches = content.matchAll(/(\n\|.*\|)\n\|( *-+ *\|)+(\n\|.*\|)*/g)

    for (const match of matches) {
        console.log("===========Match==============");
        console.log(`${match[0]}`);
    }

    return content;
}