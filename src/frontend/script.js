import {convertToLatex} from "../converter/converter.js";
import {config} from "../converter/config.js";

const textAreas = Array.from(document.querySelectorAll("textarea"));
const copyButton = document.getElementById("copy-button");
const convertButton = document.getElementById("convert-button");
const uploadButton = document.getElementById("upload-button");
const downloadButton = document.getElementById("download-button");
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

outputField.addEventListener("change", async () => {
    downloadButton.disabled = !outputField.value;
    copyButton.disabled = !outputField.value;
});

convertButton.addEventListener("click", () => {
    const tableHeadersBold = document.getElementById("table1")?.checked || false;
    const outlineRows = document.getElementById("table2")?.checked || false;
    const outlineColumns = document.getElementById("table3")?.checked || false;
    const repeatHeaders = document.getElementById("table4")?.checked || false;
    const floatTable = document.querySelector('input[name="table-float"]:checked').value;
    const alignTable = document.querySelector('input[name="table-align"]:checked').value;
    const alignTableContent = document.querySelector('input[name="table-content-align"]:checked').value;
    const imagePath = document.getElementById("image-path")?.value || "";
    const mergeImage = document.getElementById("image1")?.checked || false;
    const labelImage = document.getElementById("image2")?.checked || false;
    const floatImage = document.querySelector('input[name="image-float"]:checked').value;
    const alignImage = document.querySelector('input[name="image-align"]:checked').value;

    config.packages = [];
    config.labels = [];
    config.table.headersBold = tableHeadersBold;
    config.table.outlineRows = outlineRows;
    config.table.outlineColumns = outlineColumns;
    config.table.repeatHeaders = repeatHeaders;
    config.table.float = floatTable;
    config.table.align = alignTable;
    config.table.alignContent = alignTableContent;
    config.image.path = imagePath;
    config.image.merge = mergeImage;
    config.image.label = labelImage;
    config.image.float = floatImage;
    config.image.align = alignImage;

    outputField.value = convertToLatex(inputField.value);
    downloadButton.disabled = !outputField.value;
    copyButton.disabled = !outputField.value;
    syncTextareaHeights();
});

copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(outputField.value);
});

uploadButton.addEventListener("change", async () => {
    const file = uploadButton.files?.[0];
    if (!file) return;
    inputField.value = await file.text();
    syncTextareaHeights();
});

downloadButton.addEventListener("click", async () => {
    let content = outputField.value;
    let tempElement = document.createElement('a');
    tempElement.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`);
    tempElement.setAttribute("download", "document.tex");
    document.body.appendChild(tempElement);
    tempElement.click();
});

syncTextareaHeights();
