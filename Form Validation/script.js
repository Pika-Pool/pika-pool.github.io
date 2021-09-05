const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");


// SHOW INPUT ERROR MESSAGE
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";

    const small = formControl.querySelector("small");
    small.innerText = message;
}

// SHOW INPUT SUCCESS
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

// EMAIL PATTERN VALIDATION
function checkEmail(input) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(input.value.toLowerCase().trim())) {
        showError(input, "Email not valid");
    } else {
        showSuccess(input);
    }
}

// check the required fields
function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// CHECK LENGTH
function checkLength(input, min, max) {
    if (input.value.trim().length < min) {
        showError(input, `${getFieldName(input)} must be alteast ${min} characters long`);
    } else if (input.value.trim().length > max) {
        showError(input, `${getFieldName(input)} must not exceed ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// CHECK IF PASSWORDS MATCH
function checkPasswordMatch(input1, input2) {
    if(input1.value.trim() !== input2.value.trim()) {
        showError(input2, "Passwords should match");
    }
}

// get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


// EVENT LISTENERS
// FORM EVENTLISTENER
form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 30);
    checkLength(password, 8, 16);
    checkPasswordMatch(password, password2);
    checkEmail(email);
});