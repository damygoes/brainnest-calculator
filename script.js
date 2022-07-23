// Selecting all DOM elements
const display = document.querySelector("#display"); //display screen
const numberButtons = document.querySelectorAll(".btn-number"); //number buttons: 0-9 and .
const operationButtons = document.querySelectorAll(".btn-operator"); //operation buttons: +,-,*,/ and %
const equalsButton = document.querySelector("#equal"); // equals button: =
const deleteButton = document.querySelector("#delete"); //delete button: del
const clearButton = document.querySelector("#clear"); //all clear button: C
const previousDisplayValue = document.querySelector(".previousValue"); //previous operand input
const currentDisplayValue = document.querySelector(".currentValue"); //current operand input
let currentValue = "";
let previousValue = "";
let operation = undefined;

// the clear method clears everything on the screen when the C button is clicked
const clear = () => {
	previousValue = ""; // resets the previous value to empty
	currentValue = ""; // resets the current value to empty
	operation = undefined; //to ensure that no operation is selected when the clear button is selected
};
//the delete method removes the last number or digit of the input number when a user presses on DEL
const deleteInput = () => {
	currentValue = currentValue.toString().slice(0, -1); //here we select the current input of the user (the one on the bottom of the screen), convert it to string and call the "slice" method on it. This will allows us to remove the last value of the string. We go from index 0 to the second to the last number (index -1) and save them into the "this.currentValue" thereby chopping off the last digit
};

//the appendNumber function takes in a number as a paramater (this is supplied by the button.textContent from the numberButtons) and displays it on the screen
const appendNumber = (number) => {
	if (number === "." && currentValue.includes(".")) return; //here we make sure the user can only type the "." operator only once.
	currentValue = currentValue.toString() + number.toString(); //we set the current value (current user input) to string because we want to be able to concatenate all the numbers that the user types in and not treat them as numbers (which might add them up or just allow single number input)
};

// the chooseOperation takes a parameter (supplied by the textContent of the operationButtons)
const chooseOperation = (operation_parameter) => {
	if (currentValue === "") return; //if the user doesn't type in anything after typing in a previous value, the calculator will not run
	if (previousValue !== "") {
		//if there is a previous value (displayed up on the screen)  and we have a current value (down on the screen), we compute the numbers. This allows the aggregation of computations
		operate();
	}
	operation = operation_parameter; // here we set the operation to the operation passed in from the textContent of the operationButton, so the calculator knows which operation to use
	previousValue = currentValue; //here we set the previousValue to the currentValue. So, once the user finishes typing a number, that number is set as a previousValue and gets moved up on the display, so as to allow for operation or a new value to be typed in
	currentValue = ""; // here we set the current value to empty to allow the user type in a new value (either an operator or a new number input)
};

// the operate function performs the actual mathematical computations
const operate = () => {
	let result; //create a variable to store the result of our computation
	const previous = parseFloat(previousValue); //the previous value inputted by the user (the one on top of the dsiplay - which was converted to string earlier to allow concatenation). We convert this to number using parseFloat, so we can do calculations on it
	const current = parseFloat(currentValue); //the current value inputted by the user (the one on the bottom of the dsiplay - which was converted to string earlier to allow concatenation). We convert this to number using parseFloat, so we can do calculations on it
	// console.log(`previous: ${previous}`, `current: ${current}`);
	if (!previous || (!current && operation != "%")) return; //if the user does not enter a previous value, or a current value, the code/calculator will not run. However, if the user enters a previous value and no current value but the operation symbol is "%", the code will run.
	switch (operation) {
		case "+":
			result = previous + current;
			break;
		case "-":
			result = previous - current;
			break;
		case "/":
			if (current == 0) {
				result = "Error!";
				clear();
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
	currentValue = result; //here we set the current value (to be displayed at the bottom of the screen) to the result of the computation
	operation = undefined; // here we set operation to undefined
	previousValue = ""; // here we set the previous value (the one on top of the display) to empty
};

//the update function displays the changes on the screen everytime something changes
const updateDisplay = () => {
	currentDisplayValue.innerText = currentValue; // we set the previous display (the one on top of the screen) to the previous value the user inputs
	previousDisplayValue.innerText = previousValue; // we set the current display (the one on the bottom of the screen) to the new/current value the user inputs
};

// Looping over all number buttons and adding an event listener to each one of them
numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		appendNumber(button.textContent); //selecting the number in the button
		updateDisplay(); // displaying the chosen number on the screen
	});
});

// Looping over all operations buttons and adding an event listener on each
operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		appendNumber(button.textContent); //here we select the text content of the button and append it to the display
		chooseOperation(button.textContent); // here we send the text content value to the chooseOperation method/function
		updateDisplay(); // here we update the dsiplay to actually show the text content on the screen
	});
});
// this calls the operate function and updates the display
equalsButton.addEventListener("click", (button) => {
	operate();
	updateDisplay();
});
// this calls the clear function when the user clicks on the C button and updates the display
clearButton.addEventListener("click", (button) => {
	clear();
	updateDisplay();
});
// this calls the delete function when the user clicks on the DEL button and updates the display
deleteButton.addEventListener("click", (button) => {
	deleteInput();
	updateDisplay();
});
