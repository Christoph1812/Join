/**
 * Returns the HTML template for the login form.
 * @returns {string} The HTML template for the login form.
 */
function getLoginFormTemplate() {
    return /*html*/ `
                <span class="log-in-title">Log in</span>
                <div class="log-in-border"></div>
                <div class="login-form">
                    <div class="input-field login-email" onclick="focusInputField(this)">
                        <input type="email" placeholder="Email" id="loginemail" required>
                        <img src="img/email_logo.svg" alt="">
                    </div>
                    <div class="error-message-login">
                        <label for="loginemail" id="emailError" style="display:none;"></label>
                    </div>
                    <div class="input-field login-password" onclick="focusInputField(this)">
                        <input type="password" placeholder="Password" id="loginpassword" oninput="showLock('loginpassword', 'loginpasswordlock')"
                            required>
                        <div class="password-lock" id="loginpasswordlock">
                            <img id="lock" src="img/lock_logo.svg">
                        </div>
                    </div>
                </div>
                <div class="error-message-login-password">
                    <label for="loginpassword" id="passwordError" style="display:none;"></label>
                </div>
                <div class="options">
                    <div class="remember-me-option">
                        <input type="checkbox" id="myCheckbox" name="myCheckbox" value="on" class="checkbox">
                        <span>Remember me</span>
                    </div>
                    <div class="forgot-pw-option" onclick="forgotMyPw()">
                        <a href="#">Forgot my password</a>
                    </div>
                </div>
                <div class="log-in-buttons">
                    <button class="dark-btn log-in-btn" onclick="validateLogin()">Log in</button>
                    <button class="transparent-btn guest-log-in-btn" onclick="window.location.href='summary.html'"
                        onclick="logInAsGuest()">Guest Log in</button>
                </div>
    `;
}


/**
 * The function renders a sign-up form with input fields for name, email, and password, and a button to
 * submit the form.
 */
function renderSignUpForm() {
    document.getElementById('login').innerHTML = /*html*/ `
    <div class="back-btn">
        <img src="img/back_btn.svg" alt="" onclick="goBackToLogIn()">
    </div>
    <h1 class="sign-up-title">Sign Up</h1>
    <div class="log-in-border"></div>
    <div class="input-field user user-margin-top" onclick="focusInputField(this)">
        <input type="text" placeholder="Firstname Lastname" id="signupname">
        <img src="img/user.svg" alt="" class="user-img">
    </div>
    <div class="error-message-sign-up">
        <label id="nameError" style="display:none;"></label>
    </div>
    <div class="input-field user" onclick="focusInputField(this)">
        <input type="email" placeholder="Email" id="signupemail">
        <img src="img/email_logo.svg" alt="">
    </div>
    <div class="error-message-sign-up">
        <label id="emailError" style="display:none;"></label>
    </div>
    <div class="input-field user" onclick="focusInputField(this)">
        <input type="password" placeholder="Password" id="signuppassword" oninput="showLock('signuppassword', 'signuppasswordlock')">
        <div class="password-lock" id="signuppasswordlock">
                <img id="lock" src="img/lock_logo.svg" alt="">
        </div>
    </div>
    <div class="error-message-sign-up">
        <label id="passwordError" style="display:none;"></label>
    </div>
    
    <button class="dark-btn sign-up-btn" type="submit" onclick="validateSignUpForm(event)">Sign up</button>
    `;
}


function greateLockLogo() {
    return /*html*/ `
        <img id="lock" src="img/lock_logo.svg" >`
}


