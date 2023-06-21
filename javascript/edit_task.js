
/**
 * This function is used to fill all input fields in the edit task dialog window
 * 
 * @param {number} i - is the index position from the array tasks 
 */
function fillInputsByEditTask(i) {
    let title = tasks[i].title;
    let description = tasks[i].description;
    let dueDate = tasks[i].date;
    let status = returnStatusInTextForm(tasks[i].status);
    document.getElementById('title').value = title;
    document.getElementById('description').value = description;
    document.getElementById('due-date').value = dueDate;
    setPrioButtonByEditTask(i);
    renderContacts();
    setCheckboxesByEditTask(i);
    addContactsToArray();
    renderInicialsCircles();
    document.getElementById('status').innerHTML = status;
}


/**
 * This function is is used to set the right priority in the edit task dialog window
 * 
 * @param {number} i - is the index position from the array tasks 
 */
function setPrioButtonByEditTask(i) {
    let prio = tasks[i].prio;
    if (prio == 1) addPrio(1); /* function from addTask.js */
    if (prio == 2) addPrio(2); /* function from addTask.js */
    if (prio == 3) addPrio(3); /* function from addTask.js */

}


/**
 * This function is used to set the checkmark in the contacts drop down menu
 * 
 * @param {number} i - is the index position from the array tasks  
 */
function setCheckboxesByEditTask(i) {
    let contactArray = tasks[i].contacts;
    for (let y = 0; y < contactArray.length; y++) { /* checks if the id still exists */
        for (let z = 0; z < contacts.length; z++) {
            let indexOfContact = contacts[z].contactid.indexOf(contactArray[y]); /* if the id does not exist then -1 will be return */
            if (indexOfContact >= 0) {
                let indexOfContact = z;
                document.getElementById('checkbox' + indexOfContact).checked = true;
            }
        }
    }
}


/**
 * This function is used to return the current status in the edit task dialog window
 * 
 * @param {string} status- is the status of the task
 * @returns - returns the right status 
 */
function returnStatusInTextForm(status) {
    if (status == 'toDo') return 'To do';
    if (status == 'toProgress') return 'In progress';
    if (status == 'awaitingFeedback') return 'Awaiting Feedback';
    if (status == 'done') return 'Done';
}


/**
 * This function is used to changes to the status that was clicked in the drop down menu
 * 
 * @param {string} status - ist the status that was clicked 
 */
function changeStatusByEditTask(status) {
    status = returnStatusInTextForm(status);
    document.getElementById('status').innerHTML = status;
    toggleMenuCategory('toggle-3'); /* funktion from addTask.js - it close the drop down menu */
}


/**
 * This function is used to initiates all functions to change 
 * 
 * @param {number} i - is the index position from the array tasks 
 */
async function saveEditTask(i) {
    resetRequiredOnEditTask();
    if (checkRequiredOnEditTask() == true) {
        /* here comes the popup from bottom */
        await saveTask(i);
        await saveTaskstoBackend();
        showConfirmationPopup("edittask");
        slideOutTaskOverviewDialogBoard();
    }
}


/**
 * This function is used to save the changes in the task
 * 
 * @param {number} i - is the index position from the array tasks 
 */
async function saveTask(i) {
    let newTitle = document.getElementById('title').value;
    let newDescription = document.getElementById('description').value;
    let newPrio = prio;
    let newDueDate = document.getElementById('due-date').value;
    let newStatus = setNewStatus();
    let newContacts = setNewContacts();
    tasks[i].title = newTitle;
    tasks[i].description = newDescription;
    tasks[i].title = newTitle;
    tasks[i].prio = newPrio;
    tasks[i].date = newDueDate;
    tasks[i].status = newStatus;
    tasks[i].contacts = newContacts;
}

/**
 * This function is used to returns the new status
 * 
 * @returns returns the new added status
 */
function setNewStatus() {
    let newStatus = document.getElementById('status').innerHTML;
    if (newStatus == 'To do') return 'toDo';
    if (newStatus == 'In progress') return 'toProgress';
    if (newStatus == 'Awaiting Feedback') return 'awaitingFeedback';
    if (newStatus == 'Done') return 'done';
}

/**
 * This function is used to returns new contact list
 * 
 * @returns the new selected contacts
 */
function setNewContacts() {
    let contactsArray = [];
    for (let i = 0; i < contacts.length; i++) {
        checkbox = document.getElementById('checkbox' + i);
        contactId = contacts[i].contactid;
        if (checkbox.checked) contactsArray.push(contactId);
    }
    return contactsArray;
}


/**
 * This function is used to delete a tasks
 * 
 * @param {number} i - is the index position from the array tasks 
 */
async function deleteTask(i) {
    tasks.splice(i, 1);
    await saveTaskstoBackend();
    showConfirmationPopup("deletetask");
    slideOutDeleteTaskPopup();
    slideOutTaskOverviewDialogBoard();
}

/**
 * This function is used to check the validation and in which case it required a right input
 * 
 * @returns returns true or false
 */
function checkRequiredOnEditTask() {
    let title = document.getElementById('title').value;
    let desc = document.getElementById('description').value;
    let dueDate = document.getElementById('due-date').value;
    let allData = [title, desc, selectedContacts, dueDate,]
    let validation = true;
    for (let i = 0; i < allData.length; i++) {
        input = allData[i];
        if (input == '') {
            document.getElementById(`required${i}`).innerText += "This field is required";
            validation = false;
        }
    }
    checkprioRequiredOnEditTask(validation);
    return validation;
}


/**
 * 
 * 
 * @param {boolean} validation - the whole validation except priority   
 * @returns returns true or false by checking the priority
 */
function checkprioRequiredOnEditTask(validation) {
    if (prio == 0) {
        document.getElementById(`required4`).innerText += "A priority button is required";
        return validation = false;
    }
}


/**
 * This function is used to resets the prompts for required fields
 */
function resetRequiredOnEditTask() {
    for (let i = 0; i <= 4; i++) {
        document.getElementById(`required${i}`).innerText = "";
    }
}



