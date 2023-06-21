/**
 * This function is used to load all needed content for the summary
 */
async function loadSummaryContent() {
    await loadTasksfromBackend();
    calcAmountTasksOnBoard();
    calcAllTasks('toProgress', 'toProgressId');
    calcAllTasks('awaitingFeedback', 'awaitingFeedbackId');
    calcAllTasks('toDo', 'toDoId');
    calcAllTasks('done', 'doneId');
    calcPrioUrgent();
    getRightGreeting();
    getUpcomingDeadline();
}


/**
 * This function is used to calculates the total amount of tasks
 */
function calcAmountTasksOnBoard() {
    let amountTasks = tasks.length;
    document.getElementById('tasksId').innerHTML = amountTasks;
}


/**
 * 
 * This function is used to calculate the statues
 * 
 * @param {string} statusId - This is the id of the different stuses
 * @param {string} id - This is the id of the different stuses fields
 */
function calcAllTasks(statusId, id) {
    let task = 0;

    for (let i = 0; i < tasks.length; i++) {
        let status = tasks[i].status;
        if (status == statusId) task++;
    }
    document.getElementById(id).innerHTML = task;
}


/**
 * This function is used to calculate the amount of the priority urgent
 */
function calcPrioUrgent() {
    let amountUrgents = 0;

    for (let i = 0; i < tasks.length; i++) {
        let status = tasks[i].prio;
        if (status == 1) amountUrgents++;
    }
    document.getElementById('urgentsId').innerHTML = amountUrgents;
}



/**
 * makes the greeting appropriate to the time of day
 */
function getRightGreeting() {
    let greetingField = document.getElementById('greetingId');
    let day = new Date();
    let hr = day.getHours();
    if (hr >= 0 && hr < 12) {
        greetingField.innerHTML = ("Good morning,");
    } else if (hr == 12) {
        greetingField.innerHTML = ("Good noon,");
    } else if (hr >= 12 && hr <= 17) {
        greetingField.innerHTML = ("Good afternoon,");
    } else {
        greetingField.innerHTML = ("Good evening,");
    }
}


/**
 * This function is used to generate the next upcoming deadline
 */
function getUpcomingDeadline() {
    let dates = [];
    for (let i = 0; i < tasks.length; i++) {
        let prio = tasks[i].prio;
        if (prio == 1) {
            let date = tasks[i].date;
            date = new Date(date);
            dates.push(date);
        }
    }
    if (dates.length >= 1) filterUrgentDates(dates);
}


/**
 * This function is used to filter the next upcoming deadline and to show them 
 * 
 * @param {array} dates - dates from the urgents tasks 
 */
function filterUrgentDates(dates) {
    let filterTimestamp = Math.min.apply(null, dates);
    let upcomingDate = new Date(filterTimestamp);
    let month = upcomingDate.toLocaleString('en-us', { month: "long" });
    let year = upcomingDate.toLocaleString('en-us', { year: "numeric" });
    let day = upcomingDate.toLocaleString('en-us', { day: "numeric" });

    document.getElementById('upcomingDateId').innerHTML = `${month} ${day}, ${year}`;

}


