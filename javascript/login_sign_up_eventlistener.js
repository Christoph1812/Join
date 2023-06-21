/**
 * Added an eventlistnerer to the login button. On keydown "Enter" you can login.
 */
let button = document.getElementById("loginmain");
button.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("login-button").click();
    }
});