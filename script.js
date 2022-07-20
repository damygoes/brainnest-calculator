const display = document.querySelector("#display");
// const buttons = Array.from(document.querySelectorAll("button"));

const numberButtons = document.querySelectorAll(".btn-number");
const operationButtons = document.querySelectorAll(".btn-operator");
const equalsButton = document.querySelector("#equal");
const deleteButton = document.querySelector("#delete");
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
	delete() {
		this.currentValue = this.currentValue.toString().slice(0, -1);
	}
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
				if (current == 0) {
					result = "Error!";
					this.clear();
				} else {
					result = previous / current;
				}
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
		this.previousValue = "";
	}

	updateDisplay() {
		this.currentDisplayValue.innerText = this.currentValue;
		this.previousDisplayValue.innerText = this.previousValue;
	}
}

const calculator = new Calculator(previousDisplayValue, currentDisplayValue);

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.textContent);
		calculator.updateDisplay();
	});
});
operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.textContent);
		calculator.chooseOperation(button.textContent);
		calculator.updateDisplay();
	});
});
equalsButton.addEventListener("click", (button) => {
	calculator.compute();
	calculator.updateDisplay();
});
clearButton.addEventListener("click", (button) => {
	calculator.clear();
	calculator.updateDisplay();
});
deleteButton.addEventListener("click", (button) => {
	calculator.delete();
	calculator.updateDisplay();
});
