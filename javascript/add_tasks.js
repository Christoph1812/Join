let currentColor;
let selectedCategoryColor;
let selectedCategoryName = '';
let pointColor = ['#8AA4FF', '#FB0101', '#43D300', '#FD8A01', '#E224BE', '#013DFF', '#33D7C1',];
let subtasks = [];
let prio = 0;
let selectedContacts = [];
let subtaskValue = [];


/**
 * This function loads all Data for Add_Tasks from Backend and render the Data in the Corresponding fields
 */
async function loadAndRenderData() {
    await loadContactsfromBackend();
    await loadTasksfromBackend();
    await loadCategorysfromBackend();
    setCurrentDate();
    renderContacts();
    renderCategory();
}


/**
 * This function open the toggle Menu for the category
 * @param {string} id of the corresponding toggle menu
 */
function toggleMenuCategory(id) {
    document.getElementById(id).classList.toggle('d-none');
}


/**
 * This function open the toggle Menu for the Contact
 * @param {string} id of the corresponding toggle menu
 */
function toggleMenuContacts(id) {
    document.getElementById(id).classList.toggle('d-none');
    renderInicialsCircles();
}


/**
 * This function open the toggle Menu for category input
 * @param {string} id- the id of the corresponding toggle menu
 */
function openInputfield(id) {
    document.getElementById('toggle-menu').classList.add('d-none');
    document.getElementById('category-input').classList.remove('d-none');
    document.getElementById(id).classList.add('d-none');
    document.getElementById('color-container').classList.remove('d-none');
}


/**
 * This funktion push the category name and the color in the categorys Array
 */
function addedCategory() {
    let categoryInput = document.getElementById('category-input-field').value;

    let category = {
        'name': categoryInput,
        'color': currentColor
    }
    categorys.push(category);
}

/**
 * This function render the selected category into the input field
 */
function renderCategory() {
    let categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = '';

    for (let i = 0; i < categorys.length; i++) {
        categoryContainer.innerHTML += greateHtmlRenderCategory(i);
    }
}

/**
 * This function render a newly added category in the input field
 */
function addNewCategorytoInput() {
    let categoryInput = document.getElementById('category-input-field').value;
    let selectedCategory = document.getElementById('selected-category');
    selectedCategory.innerHTML = '';

    selectedCategory.innerHTML += greateHtmlAddNewCategoryToInput(categoryInput);
}

/**
 * This funktion is used to added a category to input field
 * 
 * @param {number} i - the index of a category
 */
function addToInput(i) {
    let selectedCategory = document.getElementById('selected-category');
    selectedCategoryColor = categorys[i]['color'];
    selectedCategoryName = categorys[i]['name'];
    selectedCategory.innerHTML = '';
    selectedCategory.innerHTML += greateHtmlAddInput(selectedCategoryColor, selectedCategoryName);
}

/**
 * This function is used to delete a category
 * @param {number} i - the index of a category
 */
function deleteCategory(i) {
    categorys.splice(i, 1);
    renderCategory();
}


/**
 * This function close the toggle Menu for category input
 * @param {string} id - the id of the corresponding toggle menu
 */
function closeInputfield(id) {
    document.getElementById('category-input').classList.add('d-none');
    document.getElementById(id).classList.remove('d-none');
    document.getElementById('color-container').classList.add('d-none');
    document.getElementById('category-input-field').value = '';
}


/**
 * This function is used to render the color points that can be assigned to a category
 */
function renderCategoryColors() {
    let colorContainer = document.getElementById('color-container');
    colorContainer.innerHTML = '';

    for (let i = 0; i < pointColor.length; i++) {
        color = pointColor[i];
        colorContainer.innerHTML += greateHtmlCategorColor(color, i)
    }
}

/**
 * This funktion is used to render the selected color point to the input field
 * @param {string} color - the Hex-colorcode of the selected color
 */
function addColor(color) {
    document.getElementById('currentColor').innerHTML = '';
    document.getElementById('currentColor').innerHTML += /*html*/ `<div class="color-circle" style="background-color: ${'' + color}"></div>`
    currentColor = color;
}


/**
 * This function is used to render the contacts in the toggle Menu
 */
function renderContacts() {
    let contactContainer = document.getElementById('contact-container');
    contactContainer.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];

        contactContainer.innerHTML += /*html*/ `
        <div class="contact">
            <span>${contact['name']} ${contact['surname']}</span>
            <input onclick="addContactsToArray()" id="checkbox${i}" type="checkbox">
        </div>`
    }
}

/**
 * The function adds selected contacts' IDs to an array.
 */
function addContactsToArray() {
    selectedContacts = [];
    let checkbox = document.querySelectorAll("input[type = 'checkbox'");

    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked == true) {
            selectedContacts.push(contacts[i]['contactid']);
        }
    }
}


/**
 * This function is used clear the selected checkboxes
 */
function resetCheckbox() {
    selectedContacts = [];
    let checkbox = document.querySelectorAll("input[type = 'checkbox'");

    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = false;
    }
}

/**
 * This function is used to render the circle of a contact
 */
function renderInicialsCircles() {
    let colorContainer = document.getElementById('inicial-circles');
    colorContainer.innerHTML = '';
    for (let y = 0; y < selectedContacts.length; y++) { /* checks if the id still exists */
        for (let z = 0; z < contacts.length; z++) {
            let indexOfContact = contacts[z].contactid.indexOf(selectedContacts[y]); /* if the id does not exist then -1 will be return */
            if (indexOfContact >= 0) {
                colorContainer.innerHTML += /*html*/`
                <div class="color-circle-contact" style="background-color: ${'' + contacts[z].profilecolor}">${contacts[z].Initials}</div>`
            }
        }
    }
}


/**
 * this function checks which button is clicked
 * @param {number} prioValue - number of the prio button
 */
function addPrio(prioValue) {
    resetPrio();
    if (prioValue == prio) {
        prioValue = 0;
        prio = 0;
    }
    if (prioValue == 1) {
        selectUrgent();
    }
    if (prioValue == 2) {
        selectMedium();
    }
    if (prioValue == 3) {
        selectLow();
    }
}


/**
 * This function changes the color of the Urgent button
 */
function selectUrgent() {
    document.getElementById('urgent-btn').classList.add('urgent-aktiv');
    document.getElementById('urgent-image').style.filter = 'brightness(0) invert(1)';
    prio = 1;
}


/**
 * This function changes the color of the Medium button
 */
function selectMedium() {
    document.getElementById('medium-btn').classList.add('medium-aktiv');
    document.getElementById('medium-image').style.filter = 'brightness(0) invert(1)';
    prio = 2;
}


/**
 * This function changes the color of the Low button
 */
function selectLow() {
    document.getElementById('low-btn').classList.add('low-aktiv');
    document.getElementById('low-image').style.filter = 'brightness(0) invert(1)';
    prio = 3;
}

/**
 * This function is used to reset all prio buttons
 */
function resetPrio() {
    document.getElementById('urgent-btn').classList.remove('urgent-aktiv');
    document.getElementById('urgent-image').style.filter = '';
    document.getElementById('medium-btn').classList.remove('medium-aktiv');
    document.getElementById('medium-image').style.filter = '';
    document.getElementById('low-btn').classList.remove('low-aktiv');
    document.getElementById('low-image').style.filter = '';
}

/**
 * This function is used to open the subtask input field
 */
function openSubtaskInput() {
    document.getElementById('subtask-plus').classList.add('d-none');
    document.getElementById('subtask-buttons').classList.remove('d-none');
}

/**
 * This function is used to close the subtask input field
 */
function closeSubtaskInput() {
    document.getElementById('subtask-input').value = '';
    document.getElementById('subtask-buttons').classList.add('d-none');
    document.getElementById('subtask-plus').classList.remove('d-none');

}

/**
 * This function is used to add a subtask to the subtasks array
 */
function addSubtasks() {
    subtaskName = document.getElementById('subtask-input').value;
    subtasks.push(subtaskName);
    subtaskValue.push(0);

}

/**
 * This function is used to render the subtasks
 */
function renderSubtasks() {
    closeSubtaskInput();
    document.getElementById('subtask-input').value = '';
    subtasksContainer = document.getElementById('subtasks-container')
    subtasksContainer.innerHTML = '';

    for (let i = 0; i < subtasks.length; i++) {
        subtasksContainer.innerHTML += /*html*/`
        <div class="subtask">
            <span>${subtasks[i]}</span>
            <img  onclick="deleteSubtasks(${i})"src="./img/black-x.svg">
        </div>`
    }
}

/**
 * This function is used to delete a subtask
 * @param {number} i - the index of the subtask
 */
function deleteSubtasks(i) {
    subtasks.splice(i, 1);
    renderSubtasks();
}


/**
 * This function used to set the current date in the 'min attribute, from the date input
 */
function setCurrentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    dueDate = document.getElementById('due-date');
    dueDate.setAttribute('min', today);
}

/**
 * This function is used to create a task into a Json, save task and category to the Backend and leads to the board.
 */
async function createTask() {
    resetRequired();
    if (checkRequired() == true) {
        await createTaskIntoJson();
        await saveTaskstoBackend();
        await saveCategorystoBackend();
        showConfirmationPopup('createtask');
        goToBoard();
    }
}


/**
 * 
 * This function is used to create a task into a Json
 */
async function createTaskIntoJson() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('due-date').value;
    let task = {
        'id': tasks.length,
        'title': title,
        'description': description,
        'category': selectedCategoryName,
        'category-color': selectedCategoryColor,
        'contacts': selectedContacts,
        'date': dueDate,
        'prio': prio,
        'subtasks': subtasks,
        'subtasks-value': subtaskValue,
        'status': 'toDo'
    }
    tasks.push(task);
}

/**
 * This function is used to go to the board, if the task is create
 */
function goToBoard() {
    setTimeout(function () {
        window.location.href = "board.html";
    }, 2000)
}





