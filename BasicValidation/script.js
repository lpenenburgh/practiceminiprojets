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
function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}



//Event listener
form.addEventListener("submit", function(e) {
    e.preventDefault();
    // console.log(username.value) will log what the user types in the username field.
    if (username.value === "") {
        showError(username, "username is required");
    } else {
        showSuccess(username);
    }
// need an if/else for every input on the form
    if (email.value === "") {
        showError(email, "email is required");
        //else if the value of the email entered returns not valid from the isValidEmail function from above 
    } else if(!isValidEmail(email.value)) {
        showError(email, "email is not valid");        
    } else {
        showSuccess(email);
    }

    if (password.value === "") {
        showError(password, "password is required");
    } else {
        showSuccess(password);
    }

    if (password2.value === "") {
        showError(password2, "password is required");
    } else {
        showSuccess(password2);
    }

    

});