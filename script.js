let display = document.getElementById("display");
let currentInput = "";
let firstOperand = null;
let operator = "";

const updateDisplay = () => {
  display.value = currentInput || firstOperand || "0";
};

const handleNumberClick = (number) => {
  currentInput += number;
  updateDisplay();
};

const handleOperatorClick = (op) => {
  if (currentInput === "") return;

  if (firstOperand === null) {
    firstOperand = parseFloat(currentInput);
  } else if (operator) {
    firstOperand = calculate(firstOperand, parseFloat(currentInput), operator);
  }
  operator = op;
  currentInput = "";
  updateDisplay();
};

const calculate = (a, b, op) => {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? "Error" : a / b;
  }
};

const handleEqualClick = () => {
  if (firstOperand === null || currentInput === "" || operator === "") return;
  firstOperand = calculate(firstOperand, parseFloat(currentInput), operator);
  currentInput = "";
  operator = "";
  updateDisplay();
};

const resetCalculator = () => {
  currentInput = "";
  operator = "";
  firstOperand = null;
  updateDisplay();
};

// Обработчики событий
document.querySelectorAll(".btn_calculator").forEach((button) => {
  button.addEventListener("click", () => handleNumberClick(button.textContent));
});

document.querySelectorAll(".btn_operator").forEach((button) => {
  button.addEventListener("click", () =>
    handleOperatorClick(button.dataset.operator)
  );
});

document
  .querySelector(".btn_equal")
  .addEventListener("click", handleEqualClick);
document.querySelector(".btn_clear").addEventListener("click", resetCalculator);
