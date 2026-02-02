const expressionInput = document.getElementById("expression");
const calculateButton = document.getElementById("calculate");
const clearButton = document.getElementById("clear");
const resultValue = document.getElementById("resultValue");
const errorText = document.getElementById("error");

const allowedPattern = /^[0-9+\-*/%.()\s]+$/;

const clearOutput = () => {
    resultValue.textContent = "—";
    errorText.textContent = "";
};

const formatResult = (value) => {
    if (!Number.isFinite(value)) {
        return "Error";
    }

    if (Number.isInteger(value)) {
        return value.toString();
    }

    return parseFloat(value.toFixed(10)).toString();
};

const calculateExpression = () => {
    const expression = expressionInput.value.trim();

    if (!expression) {
        errorText.textContent = "Please enter an expression.";
        resultValue.textContent = "—";
        return;
    }

    if (!allowedPattern.test(expression)) {
        errorText.textContent = "Only numbers, operators, and parentheses are allowed.";
        resultValue.textContent = "—";
        return;
    }

    try {
        // eslint-disable-next-line no-new-func
        const result = Function(`"use strict"; return (${expression})`)();
        errorText.textContent = "";
        resultValue.textContent = formatResult(result);
    } catch (error) {
        resultValue.textContent = "—";
        errorText.textContent = "Invalid expression.";
    }
};

calculateButton.addEventListener("click", calculateExpression);

clearButton.addEventListener("click", () => {
    expressionInput.value = "";
    expressionInput.focus();
    clearOutput();
});

expressionInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        calculateExpression();
    }
});

clearOutput();
