
let currentDraggedElement;
let cardAmounts = [];
let statusByClick = "";


/**
 * This function is used to loads all data needed for the board
 */
async function loadAllDataForTheBord() {
    await loadTasksfromBackend();
    await loadContactsfromBackend();
    await loadCategorysfromBackend();
    renderCardsIntoTheBoards();
}


/**
 * This function is used to render all tasks into the board
 */
async function renderCardsIntoTheBoards() {
    deleteBoard();
    for (let i = 0; i < tasks.length; i++) {
        cardAmounts.push(i);  /* using for drag and drop function by searching */
        let id = tasks[i].id;
        let category = tasks[i].category;
        let categoryColor = tasks[i]["category-color"];
        let title = tasks[i].title;
        let description = tasks[i].description;
        let prioImage = setPrioImage(i);
        let status = tasks[i].status;
        let contacts = tasks[i].contacts;
        document.getElementById(status + 'Id').innerHTML += templateRenderCardsIntoTheBoard(i, id, category, categoryColor, title, description, prioImage, status);
        checkNeedBar(i);
        renderContactsIntotheCard(i, contacts);
    }
    checkWindowInnerScreenForDragAndDrog();
}


/**
 * This function is used to clear the board
 */
function deleteBoard() {
    cardAmounts = [];
    document.getElementById('toDoId').innerHTML = '';
    document.getElementById('toProgressId').innerHTML = '';
    document.getElementById('awaitingFeedbackId').innerHTML = '';
    document.getElementById('doneId').innerHTML = '';
}


/**
 * This function is used checks the task whether subtasks are included and returns the amount of them 
 * 
 * @param {number} i - is the index position from the array tasks 
 * @returns - returns them amount of the subtasks - for example in this form  1/5 
 */
function checkSubtasksOnCard(i) {
    let subtask = tasks[i].subtasks;
    let subtaskValue = tasks[i]["subtasks-value"];
    let amount = 0;
    let total = subtask.length;
    if (subtask) {
        for (let i = 0; i < subtaskValue.length; i++) {
            if (subtaskValue[i] == 1) amount++;
        }
        return `${amount}/${total}`;
    }
    return "";
}


/**
 * This function is used to sets the correct image to the priority
 * 
 * @param {number} i - is the index position from the array tasks
 * @returns returns the path from correct image
 */
function setPrioImage(i) {
    let prio = tasks[i].prio;
    if (prio == 1) return "prio_urgent.svg";
    if (prio == 2) return "prio_medium.svg";
    if (prio == 3) return "prio_low.svg";
}


/**
 * This function is used to checks if a bar is required = a subtasks is available
 * 
 * @param {number} i - is the index position from the array tasks
 */
function checkNeedBar(i) {
    let checkSubtask = checkSubtasksOnCard(i);
    let subtask = tasks[i].subtasks;
    let percentBar = calcPercentForProgressBarOnCard(i);
    if (subtask.length >= 1) {
        document.getElementById('progressbarId' + i).innerHTML = templateNeedBar(i, checkSubtask, percentBar);
    }
}


/**
 * This function is used to calculates the percentage of the completed to the total. It is needed to show the progress bar
 * 
 * @param {number} i - is the index position from the array tasks 
 * @returns returns the calculated percent
 */


function calcPercentForProgressBarOnCard(i) {
    let subtaskValue = tasks[i]["subtasks-value"];
    let subtaskLength = tasks[i]["subtasks-value"].length;
    let amount = 0;
    let percent = 0;
    for (let i = 0; i < subtaskLength; i++) {
        amount = amount + subtaskValue[i];
    }
    percent = 100 / subtaskLength * amount;
    return percent;
}


/**
 * This function is used to puts in the added contacts into the task card  
 * 
 * @param {number} i - is the index position from the array tasks 
 * @param {array} contactArray - are the added contacts in the respective task
 */
function renderContactsIntotheCard(i, contactArray) {
    let difference = -3;
    let initials;
    let backgroundColor;
    let contactField = document.getElementById('contactsId' + i);
    for (let y = 0; y < contactArray.length; y++) { /* checks if the id still exists */
        for (let z = 0; z < contacts.length; z++) {
            let indexOfContact = contacts[z].contactid.indexOf(`${contactArray[y]}`); /* if the id does not exist then -1 will be return */
            if (indexOfContact >= 0) {
                difference++;
                if (y <= 2) {
                    initials = contacts[z].Initials;
                    backgroundColor = contacts[z].profilecolor;
                    contactField.innerHTML += templateRenderContactsIntoTheCard(initials, backgroundColor);
                }
            }
        }
    }
    addCardContactIconOverview(difference, contactField);
}


/**
 * This function is used to puts in the contacts background into the task card
 * 
 * @param {number} difference - difference is needed to shows an icon after 3 displayed contacts more available
 * @param {id} contactField - the respective icon container in the task card
 */
function addCardContactIconOverview(difference, contactField) {
    if (difference > 0) {
        initials = "+" + difference;
        backgroundColor = "lightgrey";
        contactField.innerHTML += templateRenderContactsIntoTheCard(initials, backgroundColor);
    }
}


/**
 * This function is used to render the selected task into the task overview
 * 
 * @param {number} i - is the index position from the array tasks 
 */
function renderTaskInToOverview(i) {
    let category = tasks[i].category;
    let categoryColor = tasks[i]["category-color"];
    let title = tasks[i].title;
    let description = tasks[i].description;
    let date = tasks[i].date;
    let prio = setPrio(i);
    let prioImage = setPrioImage(i);
    let prioColor = setPrioColor(i);
    document.getElementById('task-overviewId').innerHTML = templateRenderTaskInToOverview(i, category, categoryColor, title, description, date, prio, prioImage, prioColor);
    if (tasks[i].subtasks.length >= 1) renderSubtaskInToOverview(i);
    renderContactsInToOverview(i);
}


/**
 * This function is used to render the subtasks into the task overview
 * 
 * @param {number} i - is the index position from the array tasks
 */
function renderSubtaskInToOverview(i) {
    let subtaskfield = document.getElementById('overviewSubtasksId');
    subtaskfield.innerHTML = '';
    let subtasks = tasks[i].subtasks;
    for (let z = 0; z < subtasks.length; z++) {
        let subtask = subtasks[z];
        subtaskfield.innerHTML += templateSubtasksInToOverview(i, subtask, z);
    }
    rendersubtaskCheckboxes(i);
}


/**
 *  This function is used to render the subtasks-checkboxes into the task overview and and sets the status of the checkbox
 * 
 * @param {number} i - is the index position from the array tasks 
 */
function rendersubtaskCheckboxes(i) {
    let subtasksValue = tasks[i]["subtasks-value"];
    for (let z = 0; z < subtasksValue.length; z++) {
        if (subtasksValue[z] == 0) document.getElementById('checkboxId' + z).checked = false;
        else document.getElementById('checkboxId' + z).checked = true;
    }
}


/**
 * This function is used to set the subtast to done or not done
 * 
 * @param {number} i - is the index position from the array tasks 
 * @param {number} z - is the checkbox position from the subtasks
 */
function subtasksCheckBoxClick(i, z) {
    let checkbox = document.getElementById('checkboxId' + z);
    if (checkbox.checked == true) tasks[i]["subtasks-value"][z] = 1;
    else tasks[i]["subtasks-value"][z] = 0;
}


/**
 * This function is used to returns the right priority from the tasks
 * 
 * @param {number} i - is the index position from the array tasks  
 * @returns - returns the right priority
 */
function setPrio(i) {
    let prio = tasks[i].prio;
    if (prio == 1) return "Urgent";
    if (prio == 2) return "Medium";
    if (prio == 3) return "Low";
}


/**
 * This function is used to returns the right priority-color
 * 
 * @param {number} i - is the index position from the array tasks  
 * @returns - returns the right priority color 
 */
function setPrioColor(i) {
    let prio = tasks[i].prio;
    if (prio == 1) return "#FF3D00";
    if (prio == 2) return "#FFA800";
    if (prio == 3) return "#7AE229";
}


/**
 * This function is used to render the contacts from the selected task into the task overview
 * 
 * @param {number} i - is the index position from the array tasks 
 */
function renderContactsInToOverview(i) {
    let contactArray = tasks[i].contacts;
    for (let y = 0; y < contactArray.length; y++) { /* checks if the id still exists */
        for (let z = 0; z < contacts.length; z++) {
            let indexOfContact = contacts[z].contactid.indexOf(contactArray[y]); /* if the id does not exist then -1 will be return */
            if (indexOfContact >= 0) {
                let name = contacts[z].name;
                let surname = contacts[z].surname;
                let initials = contacts[z].Initials;
                let color = contacts[z].profilecolor;
                document.getElementById('taskoverview-contactsId').innerHTML += templateRenderContactsInToOverview(name, surname, initials, color);
            }
        }
    }
}


/**
 *  This function is used to clear the search field when changing the screen size
 */
function clearInputSearchingByResize() {
    let inputSearchingField1 = document.getElementById('input-searchingId1');
    let inputSearchingField2 = document.getElementById('input-searchingId2');
    if (inputSearchingField1.value == "") {
        if (inputSearchingField2.value == "") {
        }
        else {
            renderCardsIntoTheBoards();
            inputSearchingField1.value = "";
            inputSearchingField2.value = "";
        }
    } else {
        renderCardsIntoTheBoards();
        inputSearchingField1.value = "";
        inputSearchingField2.value = "";
    }
}


/**
 * This function is used to checks if the search field is active or not and and renders accordingly
 * 
 * @param {*} id 
 */
function filterTasksBySearching(id) {
    let search = document.getElementById('input-searchingId' + id).value;
    search = search.toLowerCase();
    if (search == '') {
        renderCardsIntoTheBoards();

    } else {
        deleteBoard();
        indexesOfSearching(search);
    }
}


/**
 * This function is used to filter related to the search input
 * 
 * @param {*} search - is the input in the search field 
 */
function indexesOfSearching(search) {
    let indexesOfSearching = [];
    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].description;
        if (title.toLowerCase().includes(search)) {
            indexesOfSearching.push(i);
            cardAmounts.push(i);
        }
        else if (description.toLowerCase().includes(search)) {
            indexesOfSearching.push(i);
            cardAmounts.push(i);
        }
    }
    for (let i = 0; i < indexesOfSearching.length; i++) {
        renderTasksToInToOverviewBySearching(indexesOfSearching[i]);
    }
    checkWindowInnerScreenForDragAndDrog();
}


/**
 * This function is used to render the filtered task into the board
 * 
 * @param {*} i - filtered indexes via search  
 */
function renderTasksToInToOverviewBySearching(i) {
    let id = tasks[i].id;
    let category = tasks[i].category;
    let categoryColor = tasks[i]["category-color"];
    let title = tasks[i].title;
    let description = tasks[i].description;
    let prioImage = setPrioImage(i);
    let status = tasks[i].status;
    let contacts = tasks[i].contacts;
    document.getElementById(status + 'Id').innerHTML += templateRenderCardsIntoTheBoard(i, id, category, categoryColor, title, description, prioImage, status);
    checkNeedBar(i);
    renderContactsIntotheCard(i, contacts);
}


/**
 * This function is used to creates a task from the create task function on the bord 
 */
async function createTaskOnBoard() {
    resetRequired();
    if (checkRequired() == true) {
        await createTaskIntoJson();
        await saveTaskstoBackend();
        await saveCategorystoBackend();
        slideOutAddTaskDialogBord();
        showConfirmationPopup('createtask');
        await setStatusAddTaskOnBoard();
        loadAllDataForTheBord();
    }
}


/**
 * This function is used to uses the plus next to the respective status to set the correct status in the global variable
 * 
 * @param {*} status - transmitted status about the plus 
 */
function setStatusByOnclick(status) {
    statusByClick = status;
}


/**
 * This function is used to takes the right status from the global variable and puts the task in the right field
 */
async function setStatusAddTaskOnBoard() {
    let lastTask = tasks.length - 1;
    tasks[lastTask].status = statusByClick;
    await saveTaskstoBackend();
}


