const str = document.querySelector("#input");
const btn = document.querySelector("#btn");
const res = document.querySelector("#output");

function reverseString(str) {
  if (str === "") return "";
  else return reverseString(str.substr(1)) + str.charAt(0);
}

btn.addEventListener("click", (e) => {
    let value = str.value.trim();
    if (value) {
      // Remove special characters and spaces, and convert to lowercase
      const cleanedValue = value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      console.log(cleanedValue);
      
      const reversed = reverseString(cleanedValue);
      if (reversed === cleanedValue) {
        res.textContent = `"${value}" is a Palindrome`;
      } else {
        res.textContent = `"${value}" is not a Palindrome`;
      }
    } else {
      res.textContent = "Please enter a valid string.";
    }
});
