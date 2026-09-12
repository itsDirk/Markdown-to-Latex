import {convertToLatex} from "../converter/converter.js";

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
    output.value = convertToLatex(input.value);
    syncTextareaHeights();
});

syncTextareaHeights();
