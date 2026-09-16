import {convertToLatex} from "../converter/converter.js";
import {config} from "../converter/config.js";

const textAreas = Array.from(document.querySelectorAll("textarea"));
const copyButton = document.getElementById("copy-button");
const convertButton = document.getElementById("convert-button");
const inputField = textAreas[0];
const outputField = textAreas[1];

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
    const repeatHeaders = document.getElementById("table4")?.checked || false;
    const alignTableContent = document.querySelector('input[name="table-content-align"]:checked').value;

    config.packages = [];
    config.settings.tableHeadersBold = tableHeadersBold;
    config.settings.outlineRows = outlineRows;
    config.settings.outlineColumns = outlineColumns;
    config.settings.repeatHeaders = repeatHeaders;
    config.settings.alignTableContent = alignTableContent;

    outputField.value = convertToLatex(inputField.value);
    syncTextareaHeights();
});

copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(outputField.value);
});

syncTextareaHeights();
