let display = document.getElementById("display");
let currentInput = "";
let firstOperand = null;
let operator = "";

const updateDisplay = () => {
  display.value = currentInput || firstOperand || "0";
};

// Функция для обработки нажатия кнопки числа
const handleNumberClick = (number) => {
  // Обработка случая, если пользователь вводит точку
  if (number === "." && currentInput.includes(".")) return;
  currentInput += number;
  updateDisplay();
};

// Функция для обработки нажатия кнопки оператора

const handleOperatorClick = (op) => {
  if (currentInput === "") return;

  if (firstOperand === null) {
    firstOperand = parseFloat(currentInput);
  } else if (operator) {
    const result = calculate(firstOperand, parseFloat(currentInput), operator);
    if (result === "Error") {
      alert("На ноль делить нельзя!");
      resetCalculator();
      return;
    }
    firstOperand = result;
  }
  operator = op;
  currentInput = "";
  updateDisplay();
};

// Функция для выполнения вычислений
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
    default:
      return 0;
  }
};

// Функция для обработки нажатия кнопки равенства
const handleEqualClick = () => {
  if (firstOperand === null || currentInput === "" || operator === "") return;
  const result = calculate(firstOperand, parseFloat(currentInput), operator);
  if (result === "Error") {
    alert("На ноль делить нельзя, иди учить математику!!!!");
    resetCalculator();
    return;
  }
  firstOperand = result;
  currentInput = "";
  operator = "";
  updateDisplay();
};

// Функция для сброса калькулятора
const resetCalculator = () => {
  currentInput = "";
  operator = "";
  firstOperand = null;
  updateDisplay();
};

const handleNegativeClick = () => {
  if (currentInput === "") return;

  if (currentInput.startsWith("-")) {
    currentInput = currentInput.slice(1);
  } else {
    currentInput = "-" + currentInput;
  }
  updateDisplay();
};

// Обработчики событий для кнопок калькулятора
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
document
  .querySelector(".btn_negative")
  .addEventListener("click", handleNegativeClick);
