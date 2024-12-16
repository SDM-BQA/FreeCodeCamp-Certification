// Selectors
const number = document.querySelector("#number");
const btn = document.querySelector("#convert-btn");
const output = document.querySelector("#output");

// Function to convert a number to Roman numerals
const convertNum = (num) => {
  const romanNumerals = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];

  let result = "";
  let number = parseInt(num, 10);

  for (let i = 0; i < romanNumerals.length; i++) {
    const [roman, value] = romanNumerals[i];
    while (number >= value) {
      result += roman;
      number -= value;
    }
  }

  return result;
};

// Function to display error message
const displayError = (message) => {
  output.classList.add("error");
  output.style.display = "block";
  output.textContent = message;
};

// Function to handle button click
const handleConvert = () => {
  const value = number.value.trim();

  // Validate input
  if (!value) {
    displayError("Please enter a valid number");
    return;
  }

  if (isNaN(value) || value.includes(".") || value.includes("e")) {
    displayError("Please enter a valid integer.");
    return;
  }

  const numValue = parseInt(value, 10);

  if (numValue < 1 || numValue > 3999) {
    if (numValue < 1) {
      displayError("Please enter a number greater than or equal to 1.");
    } else {
      displayError("Please enter a number less than or equal to 3999.");
    }
    return;
  }

  // Remove error class if present
  output.classList.remove("error");

  // Convert number and display result
  const result = convertNum(numValue);
  output.style.display = "block";
  output.textContent = result;
};

// Event listener for button
btn.addEventListener("click", handleConvert);
