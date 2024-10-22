const passwordBox = document.getElementById("password"); //getting the id password from html file
const length = 15; //length of password

//adding different characters that are used in the password
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "!@#$%^&*()_-=+{}[]|<>~";

const allChars = upperCase + lowerCase + number + symbol;

let passwordCopied = true; //setting this true because we don't want the password to be generated multiple times before copying the already generated password

//function that will generate a random password
function createPassword() {
  //Checking if the old password is copied or not
  if (!passwordCopied) {
    alert("New password won't be generated unless the existing is copied.");
    return; // New password is not generated and will exit from the function
  }

  //appending random values to the password
  let password = "";
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += number[Math.floor(Math.random() * number.length)];
  password += symbol[Math.floor(Math.random() * symbol.length)];

  //this checks whether the length of the password has been satisfied or not and add characters until the condition is satisfied
  while (length > password.length) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  passwordBox.value = password; //this will display password in input box

  passwordCopied = false; //Setting flag to false because the already generated password isn't copied yet
}

//function that helps in the copy icon for copying the password
function copyPassword() {
  //Checking whether password is generated before copying it
  if (!passwordBox.value) {
    alert('Please click on the "Generate Password" button before copying!');
    return; //if no password is generated then exit from the function
  }

  //If passwords exists, then it can be copied to the clipboard
  navigator.clipboard
    .writeText(passwordBox.value)
    .then(() => {
      alert("Password copied!!");
      passwordBox.value = ""; //This clears password from input box as it's already copied
      passwordCopied = true; //New password will be generated as the flag is set to true
    })
    .catch((err) => {
      console.error("Failed to copy password..", err);
    });
}

//This listener prevents us from typing in the password input field even if the readOnly access is removed in HTML file
passwordBox.addEventListener("keydown", function (event) {
  event.preventDefault(); // Inside the password box any keypress will be prevented with this event method
});
