let selectedMenu;
let tasks = [];
let contacts = [];
let user = [];
let categorys = [];
let highestUsedId = [];
let users = [];

/**
 * This fuction is used to load the Menu, show the selected page, show the user und load the user
 * @param {number} i id of the different pages
 */
function init(i) {
    setURL('https://christoph-haase.developerakademie.net/smallest_backend_ever');
    includeHTML().then(() => {
        selectMenuPoint(i);
        setSelectedMenu();
        showConfirmationPopup();
        let loggedInUsername = loadUserFromLocalStorage();
        if (loggedInUsername) {
            let nameoflogedinuserElement = document.getElementById('nameoflogedinuser');
            if (nameoflogedinuserElement) {
                nameoflogedinuserElement.innerHTML = loggedInUsername;
            }
        }
        loadLoggedInUser();
    });
}


/**
 * This fuction is used to show the user icon
 */
function loadLoggedInUser() {
    let loggedInUserInitials = localStorage.getItem("userInitials");
    let userInitialsElement = document.getElementById('userInitials');

    if (loggedInUserInitials && userInitialsElement) {
        userInitialsElement.innerHTML = loggedInUserInitials;
    }
}


function toggleLogOutDropDown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('dropdownlogout');
    const profile = document.getElementById('userinitials');

    // Check if the elements exist
    if (!dropdown || !profile) {
        return;
    }

    const isClickInsideDropdown = dropdown.contains(event.target);
    const isClickInsideProfile = profile.contains(event.target);

    // Toggle the dropdown menu if the click was inside the profile initials
    if (isClickInsideProfile) {
        dropdown.classList.toggle('d-none');
    }
    // Hide the dropdown menu if the click was not inside the menu
    else if (!isClickInsideDropdown) {
        dropdown.classList.add('d-none');
    }
}

// Event listener for clicking anywhere in the window
window.addEventListener('click', toggleLogOutDropDown);


/**
 * This fuction is used to save Tasks in the Backend
 */
async function saveTaskstoBackend() {
    await backend.setItem('tasks', JSON.stringify(tasks));
}

/**
 * This fuction is used to load Tasks from Backend
 */
async function loadTasksfromBackend() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}


/**
 * This fuction is used to save Contacts in the Backend
 */
async function saveContactstoBackend() {
    await backend.setItem('contacts', JSON.stringify(contacts));
    await backend.setItem('nextContactId', JSON.stringify(nextContactId));
}

/**
 * This fuction is used to load Contacts from Backend
 */
async function loadContactsfromBackend() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    usedIds = new Set(contacts.map(contact => parseInt(contact.contactid)));
    for (const contact of contacts) {
        const contactIdNumber = parseInt(contact.contactid, 10);
        if (contactIdNumber > highestUsedId) {
            highestUsedId = contactIdNumber;
        }
    }
}

/**
 * This function is used to save the user name
 * @param {string} name user name
 */

function saveUserToLocalStorage(name) {
    localStorage.setItem('loggedInUserSurname', JSON.stringify(name));
}

/**
 * This funktion is used to save the user inatials
 * @param {string} initials intitials from the user
 */

function saveUserInitialsToLocalStorage(initials) {
    localStorage.setItem("userInitials", initials);
}


/**
 * This function is used to load the user
 * @returns the logged user
 */
function loadUserFromLocalStorage() {
    let loggedInUsername = JSON.parse(localStorage.getItem('loggedInUserSurname')) || null;
    return loggedInUsername;
}

/**
 * This fuction is used save Singed in User in the Backend
 */
async function saveSignedInUserToBackend() {
    await backend.setItem('users', JSON.stringify(users));
}


/**
 * This fuction is used to load Singed in User from Backend
 */
async function loadSignedInUserfromBackend() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

/**
 * This function is used to save categorys in the Backend
 */
async function saveCategorystoBackend() {
    await backend.setItem('categorys', JSON.stringify(categorys));
}


/**
 * This fuction is used to load categorys from the Backend
 */
async function loadCategorysfromBackend() {
    await downloadFromServer();
    categorys = JSON.parse(backend.getItem('categorys')) || [];
}

/**
 * This function is used to load templates
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}
/**
 * This function reduces the closing of the dialog window, when clicking on it
 * @param {} event 
 */
function doNotClose(event) {
    event.stopPropagation();
}


/**
 * This function is used to shows which page is open
 * @param {*} i id of the different pages
 */
function selectMenuPoint(i) {
    selectedMenu = i;
}

/**
 *  This function is used to shows which page is open
 */
function setSelectedMenu() {
    const selectedMenuElement = document.getElementById(selectedMenu);
    const mobileButtonElement = document.getElementById('mobile-buttonId' + selectedMenu);

    if (selectedMenuElement) {
        selectedMenuElement.classList.add('clicked');
    }

    if (mobileButtonElement) {
        mobileButtonElement.classList.add('mobile-menu-selected');
    }
}


/*  -------------------open Dialog Window AddTask with slideIn slide Out Functions--------------------------  */


/**
 * This fuction is used to open the task dialog on the board
 */
function openAddTaskDialogBord() {
    document.getElementById('overlay-bord-addTaskId').classList.remove('d-none');
    document.getElementById('bodyBordId').classList.add('overflow-dialog');
}


/**
 * This fuction is used to close the task dialog on the board und show the board
 */
function closeAddTaskDialogBord() {
    document.getElementById('overlay-bord-addTaskId').classList.add('d-none');
    document.getElementById('bodyBordId').classList.remove('overflow-dialog');
    addTaskWindow = document.getElementById('add-task-bordId');
    addTaskWindow.classList.add('slide-in-right-add-task');
    addTaskWindow.classList.remove('slide-out-right-add-task');
    if (selectedMenu == 2) renderCardsIntoTheBoards();
}


/**
 * This function is used to silde out the task dailog 
 */
function slideOutAddTaskDialogBord() {
    let window = document.getElementById('add-task-bordId');
    window.classList.remove('slide-in-right-add-task');
    window.classList.add('slide-out-right-add-task');
    setTimeout(closeAddTaskDialogBord, 350);
}


/**
 * The function shows a confirmation popup with a specific message based on the action type provided.
 * @param actionType - The type of action that was performed, such as adding, editing, or deleting a
 * contact or task, or signing up.
 */
function showConfirmationPopup(actionType) {
    if (actionType) {
        const confirmationPopup = document.querySelector('.confirmation-popup');
        confirmationPopup.classList.add('show');
        let confirmationText = '';
        switch (actionType) {
            case 'addcontact':
                confirmationText = '<p>Contact successfully created</p>';
                break;
            case 'deletecontact':
                confirmationText = '<p>Contact successfully deleted</p>';
                break;
            case 'editcontact':
                confirmationText = '<p>Contact successfully edited</p>';
                break;
            case 'createtask':
                confirmationText = '<p>Task successfully created</p>';
                break;
            case 'edittask':
                confirmationText = '<p>Task successfully edited</p>';
                break;
            case 'deletetask':
                confirmationText = '<p>Task successfully deleted</p>';
                break;
            case 'signup':
                confirmationText = '<p>Sign up successful!</p>';
                break;
        }
        document.getElementById('confirmationpopuptext').innerHTML = confirmationText;
        setTimeout(() => {
            confirmationPopup.classList.remove('show');
        }, 1500);
    }
}

