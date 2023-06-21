/**
 * This function is used to open the add task dialog
 */
function openAddTaskDialogBord() {
    document.getElementById('overlay-bord-addTaskId').classList.remove('d-none');
    document.getElementById('bodyBordId').classList.add('overflow-dialog');
    subtasks = []; /* clear the subtasks Array */
    renderAddTaskDialog();
}


/**
 * This function is used to close the add task dialog
 */
function closeAddTaskDialogBord() {
    document.getElementById('overlay-bord-addTaskId').classList.add('d-none');
    document.getElementById('bodyBordId').classList.remove('overflow-dialog');
    addTaskWindow = document.getElementById('add-task-bordId');
    addTaskWindow.classList.add('slide-in-right-add-task');
    addTaskWindow.classList.remove('slide-out-right-add-task');
    deleteAddTaskDialog();
    clearInputSearchingByResize();
    prio = 0;
    selectedContacts = [];
}


/**
 * This function is used to slide out the dialog window by closing
 */
function slideOutAddTaskDialogBord() {
    let window = document.getElementById('add-task-bordId');
    window.classList.remove('slide-in-right-add-task');
    window.classList.add('slide-out-right-add-task');
    setTimeout(closeAddTaskDialogBord, 350);
}


/**
 * This function is used to open the task overview by clicking on a added task
 */
function openTaskOverviewDialogBord(i) {
    document.getElementById('overlay-bord-taskoverviewId').classList.remove('d-none');
    document.getElementById('bodyBordId').classList.add('overflow-dialog');
    renderTaskInToOverview(i);
}


/**
 * This function is used to close the overview task
 */
function closeTaskOverviewDialogBoard() {
    document.getElementById('overlay-bord-taskoverviewId').classList.add('d-none');
    document.getElementById('bodyBordId').classList.remove('overflow-dialog');
    let window = document.getElementById('taskoverview-bordId');
    window.classList.add('slide-in-right-task-overview');
    window.classList.remove('slide-out-right-task-overview');
    deleteTaskOverview();
    renderCardsIntoTheBoards();
    clearInputSearchingByResize();
}


/**
 * This function is used to slide out the task overview window by closing
 */
async function slideOutTaskOverviewDialogBoard() {
    let window = document.getElementById('taskoverview-bordId');
    window.classList.remove('slide-in-right-task-overview');
    window.classList.add('slide-out-right-task-overview');
    await saveTaskstoBackend();
    setTimeout(closeTaskOverviewDialogBoard, 100);
    prio = 0; /* var from AddTask.js */
}


/**
 * This function is used to render the add task dialog from a template
 */
function renderAddTaskDialog() {
    document.getElementById('add-task-contentId').innerHTML = templateAddTaskDialog();
    renderContacts();
    renderCategory();
    setCurrentDate();
}


/**
 * This function is used to render the edit task dialog from a template
 * 
 * @param {number} i - is the index position from the array tasks
 */
function renderEditTaskDialog(i) {
    deleteTaskOverview();
    document.getElementById('task-overviewId').innerHTML = templateEditTask(i);
    fillInputsByEditTask(i)
}


/**
 * This function is used to clear the add task dialog
 */
function deleteAddTaskDialog() {
    document.getElementById('add-task-contentId').innerHTML = "";
}


/**
 * This function is used to clear the task overview dialog
 */
function deleteTaskOverview() {
    document.getElementById('task-overviewId').innerHTML = "";
}


/**
 * This function is used to opens a popup when deleting a task in the section edit task
 */
function openDeleteTaskPopup(i) {
    document.getElementById('overlay-delete-taskId').classList.remove('d-none');
    document.getElementById('delete-task-pupupId').innerHTML = templateDeleteTaskPopup(i);
}


/**
 * This function is used to close the delete popup when everything is updated
 */
function closeDeleteTaskPopup() {
    document.getElementById('overlay-delete-taskId').classList.add('d-none');
    let window = document.getElementById('delete-task-pupupId');
    window.classList.add('slide-in-right-task-overview');
    window.classList.remove('slide-out-right-task-overview');
}


/**
 * This function is used to slide out the delete popup
 */
function slideOutDeleteTaskPopup() {
    let window = document.getElementById('delete-task-pupupId');
    window.classList.remove('slide-in-right-task-overview');
    window.classList.add('slide-out-right-task-overview');
    setTimeout(closeDeleteTaskPopup, 100);
}
