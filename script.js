// Selecting all DOM elements
const display = document.querySelector("#display"); //display screen
const numberButtons = document.querySelectorAll(".btn-number"); //number buttons: 0-9 and .
const operationButtons = document.querySelectorAll(".btn-operator"); //operation buttons: +,-,*,/ and %
const equalsButton = document.querySelector("#equal"); // equals button: =
const deleteButton = document.querySelector("#delete"); //delete button: del
const clearButton = document.querySelector("#clear"); //all clear button: C
const previousDisplayValue = document.querySelector(".previousValue"); //previous operand input
const currentDisplayValue = document.querySelector(".currentValue"); //current operand input

// creating a calculator class where I can define all the methids/functions associated with the calculator
class Calculator {
	// the constructor takes in all the inputs for and all the functions of the calculator. This will be the previousDisplayValue and currentDisplayValue because we need to know where to place the display text for the calculator and also track the user's input
	constructor(previousDisplayValue, currentDisplayValue) {
		this.previousDisplayValue = previousDisplayValue;
		this.currentDisplayValue = currentDisplayValue;
		this.clear(); //this makes sure that all our inputs are reset everytime we start a new calculator
	}
	//the clear method clears everything on the screen when the C button is clicked
	clear() {
		this.previousValue = ""; // resets the previous value to empty
		this.currentValue = ""; // resets the current value to empty
		this.operation = undefined; //to ensure that no operation is selected when the clear button is selected
	}
	//the delete method removes the last number or digit of the input number when a user presses on DEL
	delete() {
		this.currentValue = this.currentValue.toString().slice(0, -1); //here we select the current input of the user (the one on the bottom of the screen), convert it to string and call the "slice" method on it. This will allows us to remove the last value of the string. We go from index 0 to the second to the last number (index -1) and save them into the "this.currentValue" thereby chopping off the last digit
	}
	//the appendNumber function takes in a number as a paramater (this is supplied by the button.textContent from the numberButtons) and displays it on the screen
	appendNumber(number) {
		if (number === "." && this.currentValue.includes(".")) return; //here we make sure the user can only type the "." operator only once.
		this.currentValue = this.currentValue.toString() + number.toString(); //we set the current value (current user input) to string because we want to be able to concatenate all the numbers that the user types in and not treat them as numbers (which might add them up or just allow single number input)
	}
	// the chooseOperation takes a parameter (supplied by the textContent of the operationButtons)
	chooseOperation(operation) {
		if (this.currentValue === "") return; //if the user doesn't type in anything after typing in a previous value, the calculator will not run
		if (this.previousValue !== "") {
			//if there is a previous value (displayed up on the screen)  and we have a current value (down on the screen), we compute the numbers. This allows the aggregation of computations
			this.operate();
		}
		this.operation = operation; // here we set the this.peration to the operation passed in from the textContent of the operationButton, so the calculator knows which operation to use
		this.previousValue = this.currentValue; //here we set the previousValue to the currentValue. So, once the user finishes typing a number, that number is set as a previousValue and gets moved up on the display, so as to allow for operation or a new value to be typed in
		this.currentValue = ""; // here we set the current value to empty to allow the user type in a new value (either an operator or a new number input)
	}
	//the operate function performs the actual mathematical computations
	operate() {
		let result; //create a variable to store the result of our computation
		const previous = parseFloat(this.previousValue); //the previous value inputted by the user (the one on top of the dsiplay - which was converted to string earlier to allow concatenation). We convert this to number using parseFloat, so we can do calculations on it
		const current = parseFloat(this.currentValue); //the current value inputted by the user (the one on the bottom of the dsiplay - which was converted to string earlier to allow concatenation). We convert this to number using parseFloat, so we can do calculations on it
		// console.log(`previous: ${previous}`, `current: ${current}`);
		if (!previous || (!current && this.operation != "%")) return; //if the user does not enter a previus value, or a current value, the code/calculator will not run. However, if the user enters a previous value and no current value but the operation symbol is "%", the code will run.
		console.log(this.operation);
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
					return;
				} // here we make sure that the user gets an Error if they try to didvide a number by 0, but not break the code
				result = previous / current;
				break;
			case "*":
				result = previous * current;
				break;
			case "%":
				console.log(previous, current);
				result = previous / 100;
				console.log(result);
				break;
			default:
				return;
		}
		this.currentValue = result; //here we set the current value (to be displayed at the bottom of the screen) to the result of the computation
		this.operation = undefined; // here we set operation to undefined
		this.previousValue = ""; // here we set the previous value (the one on top of the display) to empty
	}
	//the update function displays the changes on the screen everytime something changes
	updateDisplay() {
		this.currentDisplayValue.innerText = this.currentValue; // we set the previous display (the one on top of the screen) to the previous value the user inputs
		this.previousDisplayValue.innerText = this.previousValue; // we set the current display (the one on the bottom of the screen) to the new/current value the user inputs
	}
}

// Here, we create a new calculator, passing in the two required arguments
const calculator = new Calculator(previousDisplayValue, currentDisplayValue);

// Looping over all number buttons and adding an event listener to each one of them
numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.textContent); //selecting the number in the button
		calculator.updateDisplay(); // displaying the chosen number on the screen
	});
});
// Looping over all operations buttons and adding an event listener on each
operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.textContent); //here we select the text content of the button and append it to the display
		calculator.chooseOperation(button.textContent); // here we send the text content value to the chooseOperation method/function
		calculator.updateDisplay(); // here we update the dsiplay to actually show the text content on the screen
	});
});
// this calls the operate function and updates the display
equalsButton.addEventListener("click", (button) => {
	calculator.operate();
	calculator.updateDisplay();
});
// this calls the clear function when the user clicks on the C button and updates the display
clearButton.addEventListener("click", (button) => {
	calculator.clear();
	calculator.updateDisplay();
});
// this calls the delete function when the user clicks on the DEL button and updates the display
deleteButton.addEventListener("click", (button) => {
	calculator.delete();
	calculator.updateDisplay();
});
