import {convertToLatex} from "../converter/converter.js";
import {config} from "../converter/config.js";

const textAreas = Array.from(document.querySelectorAll("textarea"));
const convertButton = document.getElementById("convert-button");
const input = textAreas[0];
const output = textAreas[1];

function syncTextareaHeights() {
    textAreas.forEach((textarea) => {
        textarea.style.height = "auto";
    });

    let maxHeight = Math.max(...textAreas.map((textarea) => textarea.scrollHeight));

    textAreas.forEach((textarea) => {
        textarea.style.height = `${maxHeight}px`;
    });
}

textAreas.forEach((textarea) => {
    textarea.addEventListener("input", syncTextareaHeights);
});

convertButton.addEventListener("click", () => {
    const tableHeadersBold = document.getElementById("table1")?.checked || false;
    const outlineRows = document.getElementById("table2")?.checked || false;
    const outlineColumns = document.getElementById("table3")?.checked || false;

    config.packages = [];
    config.settings.tableHeadersBold = tableHeadersBold;
    config.settings.outlineRows = outlineRows;
    config.settings.outlineColumns = outlineColumns;

    output.value = convertToLatex(input.value);
    syncTextareaHeights();
});

syncTextareaHeights();
