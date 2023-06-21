/**
 * Added an eventlistnerer to the subtasks Input field. On keydown "Enter" you added the  value of the Input field as a subtasks.
 */
let input = document.getElementById("subtask-input");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("enter-button").click();
    }
});

