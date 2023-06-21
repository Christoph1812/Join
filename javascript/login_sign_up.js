const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)[a-zA-Z0-9]{8,64}$/;
const nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;


/**
 * This function loads signed-in user and contacts, and creates a set of used contact IDs.
 */
async function loadUsers() {
    await loadSignedInUserfromBackend();
    await loadContacts();
    usedIds = new Set(contacts.map(contact => parseInt(contact.contactid)));
}

/**
 * Validates the inpiutfields from LogIn
 * @param {string} value -from input
 * @param {string} regex -Regular Expression
 * @param {*string} errorID - id from inputput
 * @param {string} errormessage - message
 * @returns 
 */
function validateLoginInput(value, regex, errorID, errormessage) {
    if (!regex.test(value)) {
        loginErrorMessage(errorID, errormessage);
        return false;
    } else {
        hideLoginErrorMessage(errorID);
        return true;
    }
}


/**
 * This function is used to focus the imput field
 * @param {string} container  - The global this.
 */
function focusInputField(container) {
    const input = container.querySelector('input');
    input.focus();
}


/**
 * The function validates user input for email and password fields and calls the login function if both
 * inputs are valid.
 */
function validateLogin() {
    const emailValue = document.getElementById('loginemail').value;
    const passwordValue = document.getElementById('loginpassword').value;

    const isEmailValid = validateLoginInput(emailValue, emailRegex, 'emailError', 'Please enter a valid email address.')
    const isPasswordValid = validateLoginInput(passwordValue, passwordRegex, 'passwordError', 'Please enter a valid password (at least 8 characters and 1 number).')

    if (isEmailValid && isPasswordValid) {
        login();
    }
}


/**
 * This function handles the login process by checking the user's email and password, and redirecting
 * them to the summary page if the login is successful.
 */
async function login() {
    let loginemail = document.getElementById('loginemail');
    let loginpassword = document.getElementById('loginpassword');
    let user = users.find(u => u.email == loginemail.value);

    if (user) {
        if (user.password == loginpassword.value) {
            saveUserToLocalStorage(user.name);
            saveUserInitialsToLocalStorage(user.name[0].toUpperCase() + user.surname[0].toUpperCase());
            window.location.href = 'summary.html';
        } else {
            hideLoginErrorMessage('emailError');
            loginErrorMessage('passwordError', 'Incorrect password. Please try again.');
        }
    } else {
        loginErrorMessage('emailError', 'Email not found. Please check your email address.');
        hideLoginErrorMessage('passwordError');
    }
}


/**
 * The function displays an error message on a webpage for a specific element.
 * @param id - The id of the HTML element where the error message will be displayed.
 * @param message - The error message that will be displayed to the user.
 */
function loginErrorMessage(id, message) {
    const errorLabel = document.getElementById(id);
    errorLabel.innerHTML = message;
    errorLabel.style.display = 'block';
}


/**
 * The function hides an error message element with a specified ID.
 * @param id - The parameter "id" is a string that represents the id attribute of an HTML element. This
 * function uses the id to get a reference to the HTML element and then sets its display style to
 * "none", effectively hiding it from view.
 */
function hideLoginErrorMessage(id) {
    const errorLabel = document.getElementById(id);
    errorLabel.style.display = 'none';
}


/**
 * The function shows a lock or a hide password button based on whether the password input field is
 * empty or not.
 */
function showLock(passwordID, passwordLockID) {
    let passwordInput = document.getElementById(passwordID);
    let passwordLock = document.getElementById(passwordLockID);
    if (passwordInput.value === '') {
        passwordLock.innerHTML = greateLockLogo();
    } else {
        passwordLock.innerHTML =  /*html*/ `
        <div class="hide-password" onclick="showAndHide('${passwordID}','${passwordLockID}' )"></div>
     `
    }

}

function showAndHide(passwordID, passwordLockID) {
    let passwordInput = document.getElementById(passwordID);
    let passwordLock = document.getElementById(passwordLockID);
    if (passwordInput.type == 'text') {
        passwordInput.type = 'password';
        passwordLock.classList.remove('hide-password');
        passwordLock.classList.add('show-password');
    } else {
        passwordInput.type = 'text';
        passwordLock.classList.remove('hide-password');
        passwordLock.classList.add('show-password');
    }
}


/**
 * The function logs in the user as a guest and saves their initials and username to local storage.
 */
async function logInAsGuest() {
    saveUserInitialsToLocalStorage("G");
    saveUserToLocalStorage('Guest');
}


/**
 * The function clears the login section, hides the signup header and bottom section, and renders a
 * sign-up form.
 */
function singUpForm() {
    document.getElementById('login').innerHTML = '';
    document.getElementById('signupheader').classList.add('d-none');
    document.getElementById('login').classList.add('sign-up-height');
    document.getElementById('signupbottomsection').classList.add('d-none');
    renderSignUpForm();
}


/**
 * this function validates the Input from sign up
 * 
 * @param {string} valueID 
 * @param {string} regex 
 * @param {string} errorID 
 * @param {string} errormessage 
 * @returns 
 */
function validateSignUpInput(valueID, regex, errorID, errormessage) {
    const value = document.getElementById(valueID).value;

    if (!regex.test(value)) {
        showSignUpErrorMessage(errorID, errormessage);
        return null;
    } else {
        hideSignUpErrorMessage('nameError');
        return value;
    }
}


/**
 * Validates the sign up form by calling the getAndValidateName(), getAndValidateEmail(), and getAndValidatePassword() functions.
 * If all inputs are valid, calls the signUp() function.
 */
function validateSignUpForm() {
    const name = validateSignUpInput('signupname', nameRegex, 'nameError', 'Please enter a valid name (first and last name).');
    const email = validateSignUpInput('signupemail', emailRegex, 'emailError', 'Please enter a valid email address.');
    const password = validateSignUpInput('signuppassword', passwordRegex, 'passwordError', 'Please enter a valid password (at least 8 characters and 1 number).');

    if (name && email && password) {
        signUp(name, email, password);
    }
}


/**
 * This function is used to sign up a new user and greate a new contact
 */
async function signUp(name, email, password) {
    greateUser(name, email, password);
    const loggedInUsername = loadUserFromLocalStorage();
    await saveSignedInUserToBackend(users);
    let currentUser = users[users.length - 1]
    greateContact(currentUser, email);
    setUserName(loggedInUsername);
    saveUserInitialsToLocalStorage(currentUser['name'][0].toUpperCase() + currentUser['surname'][0].toUpperCase());
    loadLoggedInUser();
    await saveContactstoBackend(contacts);
    clearInput();
    showConfirmationPopup('signup');
    setTimeout(() => {
        window.location.href = "login_sign_up.html";
    }, 1500);
}


/**
 * 
 * This function is used to greate a new user account
 * @param {string} signUpName -Username
 * @param {*string} signUpEmail -E-mail address
 * @param {string*} signUpPassword -Password
 */
function greateUser(signUpName, signUpEmail, signUpPassword) {
    // Split the name into first and last name
    const [name, surname] = signUpName.split(' ');

    const newUser = {
        name: name,
        surname: surname,
        email: signUpEmail,
        password: signUpPassword
    }
    users.push(newUser);
}


/**
 * This function is used to greate a new contact
 * 
 * @param {string} currentUser - The actual user object
 * @param {*string} signUpEmail -The actual e-mail adress
 */
function greateContact(currentUser, signUpEmail) {
    const lastContactId = getNextContactId();
    const usedColors = contacts.map(contact => contact.profilecolor);
    const availableColors = ['#343a40', '#dc3545', '#007bff', '#28a745', '#6c757d', '#ffc107', '#7952b3', '#17a2b8', '#6f42c1'].filter(color => !usedColors.includes(color) && color !== '#FFFFFF');
    const profileColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    const newContact = {
        'name': currentUser['name'],
        'surname': currentUser['surname'],
        'email': signUpEmail,
        'profilecolor': profileColor,
        'Initials': currentUser['name'][0].toUpperCase() + currentUser['surname'][0].toUpperCase(),
        'phonenumber': '',
        'contactid': lastContactId
    };
    contacts.push(newContact);
}


/**
 * This function is used to write the name in sammary
 * 
 * @param {string} loggedInUsername -User name
 */
function setUserName(loggedInUsername) {
    if (loggedInUsername) {
        const nameoflogedinuserElement = document.getElementById('nameoflogedinuser');
        if (nameoflogedinuserElement) {
            nameoflogedinuserElement.innerHTML = loggedInUsername;
        }
    }
}


/**
 * this function is used to clear the input fields
 */
function clearInput() {
    document.getElementById('signupname').value = '';
    document.getElementById('signupemail').value = '';
    document.getElementById('signuppassword').value = '';
}


/**
 * Shows an error message for a sign up form input field by setting the message content and displaying it.
 * @param {string} id - The ID of the error label element.
 * @param {string} message - The error message to be displayed.
 */
function showSignUpErrorMessage(id, message) {
    const errorLabel = document.getElementById(id);
    errorLabel.innerHTML = message;
    errorLabel.style.display = 'block';
}


/**
 * Hides an error message for a sign up form input field by hiding the error label element.
 * @param {string} id - The ID of the error label element.
 */
function hideSignUpErrorMessage(id) {
    const errorLabel = document.getElementById(id);
    errorLabel.style.display = 'none';
}


/**
 * Resets the sign up form values.
 * @param {HTMLElement} signUpName The sign up name input element.
 * @param {HTMLElement} signUpEmail The sign up email input element.
 * @param {HTMLElement} signUpPassword The sign up password input element.
 */
function resetSignUpFormValues(signUpName, signUpEmail, signUpPassword) {
    signUpName.value = '';
    signUpEmail.value = '';
    signUpPassword.value = '';
}


/**
 * Reverts the login element's content and classes to its initial state.
 */
function revertLoginElement() {
    document.getElementById('login').innerHTML = '';
    document.getElementById('login').classList.remove('sign-up-height');
}


/**
 * Reverts the sign up header and bottom section elements to their initial state.
 */
function revertSignUpElements() {
    document.getElementById('signupheader').classList.remove('d-none');
    document.getElementById('signupbottomsection').classList.remove('d-none');
}


/**
 * Reverts the sign up form back to the login form.
 */
function goBackToLogIn() {
    const signUpName = document.getElementById('signupname');
    const signUpEmail = document.getElementById('signupemail');
    const signUpPassword = document.getElementById('signuppassword');

    resetSignUpFormValues(signUpName, signUpEmail, signUpPassword);
    revertLoginElement();
    revertSignUpElements();

    document.getElementById('login').innerHTML = getLoginFormTemplate();
}


/**
 * The function hides login and signup elements and shows the forgot password element.
 */
function forgotMyPw() {
    document.getElementById('loginmain').classList.add('d-none');
    document.getElementById('signupheader').classList.add('d-none');
    document.getElementById('signupbottomsection').classList.add('d-none');
    document.getElementById('forgotmypw').classList.remove('d-none');
}


/**
 * The function redirects the user to the login/sign up page.
 */
function goBackToMainLogin() {
    window.location.href = "login_sign_up.html";
}
