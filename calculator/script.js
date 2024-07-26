// Get the reference for relevant buttons and display
const buttons = document.querySelectorAll("input[type='button']");
const display = document.querySelector("input[type='text']");

// Set display value to Empty in the beginning
display.value = "";

// Use forEach loop in Node List
buttons.forEach((element) => {
  // Putting the click event on each individual button
  element.addEventListener("click", function (e) {
    // Check the value of the element and do appropriate tasks.
    switch (e.target.value) {
      case "AC":
        display.value = "";
        break;
      case "DE":
        if (display.value) {
          display.value = display.value.slice(0, -1);
        }
        break;
      case "=":
        result();
        break;
      case ".":
        checkDecimal();
        break;
      default:
        display.value += e.target.value;
        break;
    }
  });
});

// Logic to properly place decimal point - There can't be more than one decimal point in each number. It atleast works for two number.
function checkDecimal() {
  let count = 0;
  let operator = true;
  let indexArray = [];
  for (let index = 0; index < display.value.length; index++) {
    if (display.value.charAt(index) === ".") {
      count++;
      indexArray.push(index);
    }
  }

  if (count === 0) {
    display.value += ".";
  }

  if (count === 1) {
    for (let index = 0; index < display.value.length; index++) {
      if (
        display.value.charAt(index) === "+" ||
        display.value.charAt(index) === "-" ||
        display.value.charAt(index) === "*" ||
        display.value.charAt(index) === "/"
      ) {
        if (index > indexArray[0]) {
          display.value += ".";
        }
      }
    }
  }
}

// Tried doing it without eval function, but it becomes a lot more complex when there are more than two operators.
function result() {
  const result = eval(display.value);
  display.value = result;
}
