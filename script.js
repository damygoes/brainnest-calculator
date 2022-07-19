const display = document.querySelector("#display");
// const buttons = Array.from(document.querySelectorAll("button"));

const numberButtons = document.querySelectorAll(".btn-number");
const operationButtons = document.querySelectorAll(".btn-operator");
const equalsButton = document.querySelector("#equal");
const deleteButton = document.querySelector("#del");
const clearButton = document.querySelector("#clear");
const previousDisplayValue = document.querySelector(".previousValue");
const currentDisplayValue = document.querySelector(".currentValue");
// console.log(typeof buttons);

class Calculator {
	constructor(previousDisplayValue, currentDisplayValue) {
		this.previousDisplayValue = previousDisplayValue;
		this.currentDisplayValue = currentDisplayValue;
		this.clear();
	}
	clear() {
		this.previousValue = "";
		this.currentValue = "";
		this.operation = undefined;
	}
	delete() {}
	appendNumber(number) {
		if (number === "." && this.currentValue.includes(".")) return;
		this.currentValue = this.currentValue.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentValue === "") return;
		if (this.previousValue !== "") {
			this.compute();
		}
		this.operation = operation;
		this.previousValue = this.currentValue;
		this.currentValue = "";
	}

	compute() {
		let result;
		const previous = parseFloat(this.previousValue);
		const current = parseFloat(this.currentValue);
		if (isNaN(previous) || isNaN(current)) return;
		switch (this.operation) {
			case "+":
				result = previous + current;
				break;
			case "-":
				result = previous - current;
				break;
			case "/":
				result = previous / current;
				break;
			case "*":
				result = previous * current;
				break;
			case "%":
				result = previous / 100;
				break;
			default:
				return;
		}
		this.currentValue = result;
		this.operation = undefined;
		this.currentValue = "";
	}

	updateDisplay() {
		this.currentDisplayValue.innerText = this.currentValue;
		this.previousDisplayValue.innerText = this.previousValue;
	}
}

const calculator = new Calculator(previousDisplayValue, currentDisplayValue);

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});
operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText);
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});
equalsButton.addEventListener("click", (button) => {
	calculator.compute();
	calculator.updateDisplay();
});
