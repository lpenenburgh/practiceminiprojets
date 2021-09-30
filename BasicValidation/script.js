//refactored version

//variables
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//show input error message
function showError(input, message) {
    // to add the error red border
    const formControl = input.parentElement;
    //now that we have access to the formcontrol div as a variable- we are going to reassign its classname to include "error" class from the css//
    formControl.className = "formcontrol error";

    const small = formControl.querySelector("small");
    small.innerText = message;
}


//show success outline- no error message needed
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "formcontrol success";
}

//check if email is valid using javascript email regex
//https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //return re.test(String(email).toLowerCase());
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, "Email is not valid");
    }
}

// check required fields
//"input" represents each array item
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        //console.log(input.value);
        if(input.value.trim() === "") {
            //if we want to capitalize the first letter of the input field name in the message, we make another function we will call getFieldName that will do that for us below
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

//check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);    
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`); 
    } else {
        showSuccess(input);
    }
}


//check passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        //to show the error message on the 2nd pass input
        showError(input2, "Passwords do not match");
    }
}

//get fieldname function to uppercase its first letter-we will cut out the first letter, make it uppercase, and then join the rest of the word
//charAt = character at. the zero is the positioning of the 1st letter
//The slice() method extracts parts of a string and returns the extracted parts in a new string. 
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event listener
form.addEventListener("submit", function(e) {
    e.preventDefault();
 
    //checkRequired(username); if we used this, we would have to have this function over and over for each input. Instead of passing in one input variable at a time, use an array of all the input variables.//
    checkRequired([username, email, password, password2]);
    // parameters match the function params of (input, min, max)
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});
