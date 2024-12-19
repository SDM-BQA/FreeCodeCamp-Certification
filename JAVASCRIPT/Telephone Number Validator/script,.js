const userInput = document.querySelector("#user-input");
const checkBtn = document.querySelector("#check-btn");
const clearBtn = document.querySelector("#clear-btn");
const result = document.querySelector("#results-div");

const oneRegex = /^1\s*(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
const zeroRegex = /^\(\d{3}\)\s?\d{3}-\d{4}$|^\d{10}$|^\d{3}-\d{3}-\d{4}$/;

const regexArr = [oneRegex, zeroRegex];

const checkBtnHandler = (e) => {
  const userValue = userInput.value.trim();
  if (userValue) {
    const isValid = regexArr.some((regex) => regex.test(userValue));
    updateUI(isValid, userValue);
    userInput.value = "";
  } else {
    alert("Please provide a phone number");
  }
};
const clearBtnHandler = (e) => {
  if (userInput.value) {
    userInput.value = "";
  }
  result.innerHTML = "";
};

// updateUi
const updateUI = (isValid, value) => {
  const msg = isValid
    ? `Valid US number: ${value}`
    : `Invalid US number: ${value}`;
  result.innerHTML = "<p>" + msg + result.innerHTML + "</p>";
};

// check btn
checkBtn.addEventListener("click", checkBtnHandler);
// clear btn
clearBtn.addEventListener("click", clearBtnHandler);
//enter
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkBtnHandler();
  }
});
