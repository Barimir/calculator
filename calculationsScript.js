class CoolCalculator {
  constructor(prevCalculationText, currCalculationText) {
    this.prevCalculationTxt = prevCalculationText;
    this.currCalculationTxt = currCalculationText;
    this.clearCal();
  }

  deleteCal() {
    this.currentCalculation = this.currentCalculation.toString().slice(0, -1); // get the last value of the current operand and get rid of it
  }

  clearCal() {
    this.currentCalculation = "";
    this.previousCalculation = "";
    this.operation = undefined;
  }

  // used whenever an user clicks a number to add to the screen
  appendNumber(number) {
    if (number === "." && this.currentCalculation.includes(".")) {
      // if want to add a . but there is a already a period, return
      return;
    }
    this.currentCalculation =
      this.currentCalculation.toString() + number.toString(); // convert them to string so that they don't get summed but just added to the screen
  }

  selectOperation(operation) {
    if (this.currentCalculation === "") {
      // to avoid appending operations without any numbers
      return;
    }
    if (this.previousCalculation != "") {
      // compute value if clicked on another operand instead of equal sing
      this.calculateValue();
    }
    this.operation = operation;
    this.previousCalculation = this.currentCalculation;
    this.currentCalculation = "";
  }

  calculateValue() {
    let calculationResult; // result of computer function
    const prev = parseFloat(this.previousCalculation); // converting string to number;
    const cur = parseFloat(this.currentCalculation);

    if (isNaN(prev) || isNaN(cur)) {
      // if prev or cur does not have a value
      return;
    }

    switch (this.operation) {
      case "+":
        calculationResult = prev + cur;
        break;
      case "-":
        calculationResult = prev - cur;
        break;
      case "*":
        calculationResult = prev * cur;
        break;
      case "÷":
        calculationResult = prev / cur;
        break;
      default:
        // in case the symbol does not match, we don't want to do any operation
        return;
    }
    this.currentCalculation = calculationResult;
    this.operation = undefined;
    this.previousCalculation = "";
  }

  // function to display numbers with commas for a nicer look
  formatResultDisplay(number) {
    const stringNumber = number.toString();
    const intDigits = parseFloat(stringNumber.split(".")[0]); // split the number into an array at the decimal point and get the integer values
    const decDigits = stringNumber.split(".")[1]; // same but decimal digits
    let integerDisplay;
    if (isNaN(intDigits)) {
      // if intDigits is not a number (. or nothing)
      integerDisplay = "";
    } else {
      // if it is an integer value
      integerDisplay = intDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      }); // no decimal places after the the value
    }
    if (decDigits != null) {
      // if the user entered a period and there is some numbers after
      return `${integerDisplay}.${decDigits}`;
    } else {
      // no decimal digits
      return integerDisplay;
    }
  }

  updateCalDisplay() {
    this.currCalculationTxt.innerText = this.formatResultDisplay(
      this.currentCalculation
    );
    if (this.operation != null) {
      // if there is an operation, display previous operand element and the operation element
      this.prevCalculationTxt.innerText = `${this.formatResultDisplay(
        this.previousCalculation
      )} ${this.operation}`;
    } else {
      // if operation is empty, clear previous text operand
      this.prevCalculationTxt.innerText = "";
    }
  }
}

const numButtons = document.querySelectorAll("[data-number]"); // get all elements that are data-number
const operationButtons = document.querySelectorAll("[data-operation]"); // get all elements that are data-operation
const eqButton = document.querySelector("[data-equals]");
const delButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const prevCalculationText = document.querySelector("[data-previous-operand]");
const currCalculationText = document.querySelector("[data-current-operand]");

const calculator = new CoolCalculator(prevCalculationText, currCalculationText);

// whenever click a number button, update display with the number
numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText); // whenever there is a click, call append function
    calculator.updateCalDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.selectOperation(button.innerText); // whenever there is a click, call append function
    calculator.updateCalDisplay();
  });
});

eqButton.addEventListener("click", (button) => {
  calculator.calculateValue();
  calculator.updateCalDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clearCal();
  calculator.updateCalDisplay();
});

delButton.addEventListener("click", (button) => {
  calculator.deleteCal();
  calculator.updateCalDisplay();
});
