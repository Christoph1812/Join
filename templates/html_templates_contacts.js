/**
 * This function returns a template for an HTML form to add a task with various input fields and
 * buttons.
 * @returns A HTML template for a dialog box to add a task, including input fields for title,
 * description, category, assigned contact, due date, priority, and subtasks, as well as buttons to
 * clear the form and create the task.
 */
function greateAddTaskDialog() {
    return /*html*/ `
        <h1 class="task-headline">Add Task</h1>
        <div class="task-container">
            <div class="task-left">
                <!-- tittle input -->
                <div class="input-container">
                    <label>Title</label>
                    <div class="input-field">
                        <input id="title" type="text" placeholder="Enter a title">
                    </div>
                    <p class="required" id="required0"></p>
                </div>
                <!-- description input -->
                <div class="input-container">
                    <label>Description</label>
                    <textarea class="textarea-field" id="description" rows="3"
                        placeholder="Enter a description"></textarea>
                    <p class=" required" id="required1"></p>
                </div>
                <!-- category input -->
                <div class="input-container">
                    <label>Category</label>
                    <div class="toggle-menu">
                        <div id="toggle-menu" class="select-task-category" onclick="toggleMenuCategory('toggle-1')">
                            <div id="selected-category">Select task category</div>
                            <img src=" ./img/triangle.svg">
                        </div>
                        <div id="category-input" class="input-field d-none">
                            <input id="category-input-field" type="text" placeholder="New category name">
                            <div id="add-input" class="add-input">
                                <div id="currentColor" class="color-circle"></div>
                                <img onclick="closeInputfield('toggle-menu')" class="x" src="./img/black-x.svg">
                                <img onclick="addNewCategorytoInput(), addedCategory(), renderCategory(), closeInputfield('toggle-menu')"
                                    src="./img/tick_dark.svg">
                            </div>
                        </div>
                        <div id="toggle-1" class="selection d-none">
                            <span class="category" onclick="openInputfield('toggle-1'), renderCategoryColors()">New
                                Category</span>
                            <div id="category-container"></div>
                        </div>
                    </div>
                    <div id="color-container" class="color-container"></div>
                    <p class="required" id="required2"></p>
                </div>
                <!-- contact input -->
                <div class="input-container">
                    <label>Assigned to</label>
                    <div class="toggle-menu">
                        <div class="assigned-to" onclick="toggleMenuContacts('toggle-2')">
                            <span>Select contact to assign</span>
                            <img src="./img/triangle.svg">
                        </div>
                        <div id="toggle-2" class="selection d-none">
                            <div id="contact-container"></div>
                        </div>
                    </div>
                    <div class="color-container-contact" id="inicial-circles"></div>
                    <p class="required" id="required3"></p>
                </div>
            </div>
            <div class="task-right">
                <!-- Date input -->
                <div class="input-container">
                    <label>Due date</label>
                    <div class="input-field due-date">
                        <input id="due-date" type="date" placeholder="dd/mm/yyyy" min="2023-03-15">
                    </div>
                    <p class="required" id="required4"></p>
                </div>
                <!-- Prio Buttons input -->
                <div class="input-container">
                    <label>Prio</label>
                    <div class="prio-btn">
                        <button id="urgent-btn" onclick="addPrio(1)"><span>Urgent</span><img class="prio-img"
                                id="urgent-image" src="./img/prio_urgent.svg"></button>
                        <button id="medium-btn" onclick="addPrio(2)"><span>Medium</span><img class="prio-img"
                                id="medium-image" src="./img/prio_medium.svg"></button>
                        <button id="low-btn" onclick="addPrio(3)"><span>Low</span><img class="prio-img" id="low-image"
                                src="./img/prio_low.svg"></button>
                    </div>
                    <p class="required" id="required5"></p>
                </div>
                <!-- subtask input -->
                <div class="input-container">
                    <label>Subtasks</label>
                    <div class="input-field">
                        <input onclick="openSubtaskInput()" id="subtask-input" type="text"
                            placeholder="Add new subtask">
                        <img onclick="openSubtaskInput()" id="subtask-plus" src="./img/plus_dark.svg">
                        <div id="subtask-buttons" class="d-none subtask-input">
                            <img onclick="closeSubtaskInput()" class="x" src="./img/black-x.svg">
                            <img onclick="addSubtasks(), renderSubtasks()" src="./img/tick_dark.svg">
                        </div>
                    </div>
                    <div id="subtasks-container"></div>
                </div>
            </div>
        </div>
        <!-- Clear and Create Buttons -->
        <div class="add-task-buttons">
            <button onclick="resetForm()" class="transparent-btn clear-btn"><span>clear
                    x</span></button>
            <button onclick="createTaskForContactOnBoard()" type="submit" class="dark-btn create-btn">
                <span>Create Task</span>
                <img src="./img/tick_white.svg">
            </button>
        </div>
    `
}

/**
 * The function returns a div element containing the initials of a contact and a background color based
 * on the contact's profile color.
 * @param contact - The parameter "contact" is an object that contains information about a contact,
 * such as their name, email, phone number, and profile color. The function is using the "contact"
 * object to retrieve the contact's initials and profile color, and then using that information to
 * generate HTML code for a contact
 * @returns A string of HTML code that creates a div element with a class of "contact-info-initials"
 * and a background color based on the "profilecolor" property of the "contact" object. Inside the div,
 * there is a paragraph element with the text content of the "Initials" property of the "contact"
 * object.
 */
function getProfileInitials(contact) {
    return /*html*/`
        <div class="contact-info-initials" style="background-color: ${contact.profilecolor}">
            <p>${contact.Initials}</p>
        </div>
    `
}


function greateContactListHeadline() {
    return /*html*/ `
    <div class="contactlist-info-headline">
        <h1>Contacts</h1>
        <div class="contactlist-border"></div>
        <p>Better with a team</p>
    </div>
`
}

function greateNoContacts() {
    return /*html*/`
    <div class="no-contacts">
        <p class="no-contacts-text">No contacts yet! Add some to brighten up your list and stay connected with your favorite people.</p>
        <div class="dark-btn new-contact none-responsive" onclick="newContact()" id="newcontactbtn">
            <p>New Contact</p>
            <img src="img/new_contact_icon.svg">
        </div>
    </div>
        `;
}

function greateContactItem(contact, index) {
    return /*html*/ `
    <div class="contacts" onclick="showContactInfo(${index})" id="${contact.contactid}">
        <div class="contact-initials" style="background-color: ${contact.profilecolor}">
            <p>${contact.Initials.toUpperCase()}</p>
        </div>
        <div class="contact-name-email">
            <div class="contact-name">
                <p>${maxNameSurnameChar(contact.name.charAt(0).toUpperCase() + contact.name.slice(1).toLowerCase(), contact.surname.charAt(0).toUpperCase() + contact.surname.slice(1).toLowerCase())}</p>
            </div>
            <div class="contact-email">
                <p>${maxEmailChar(contact.email)}</p>
            </div>
        </div>
    </div>
    `
}

function greateClickedContact(formattedName, formattedSurname, formattedEmail, contactinfo, i, phoneNumberHTML) {
    return /*html*/`
<div class="contact-info-initials-name-add-task">
    <div class="contact-info-initials-info" style="background-color: ${contactinfo.profilecolor}">
        <p>${contactinfo.Initials}</p>
    </div>
    <div class="contact-info-name-add-task">
        <p class="contact-info-name">${formattedName} ${formattedSurname}</p>
        <div class="contact-info-add-task" onclick="openAddTaskDialogBord(${i})">
            <div class="contact-plus-icon"></div>
            <p>Add Task</p>
        </div>
    </div>
</div>
<div class="contact-information-edit-contact">
    <div class="contact-information">
        <p>Contact Information</p>
    </div>
    <div class="edit-contact" onclick="editContact(${i})">
        <div class="pen-icon"></div>
        <p>Edit Contact</p>
    </div>
</div>
<div class="contact-info-email-phone">
    <div class="email-phone">
        <div class="contact-info-email">
            <p class="weight-1000">Email</p>
            <p class="contact-info-email-underline">${formattedEmail}</p>
        </div>
        <div class="contact-info-phone" id="phonenumberempty">
            ${phoneNumberHTML}
        </div>
    </div>
    <div class="delete-contact-section">
        <button onclick="deleteContactPopup(${i})" class="dark-btn delete-contact-btn">
            <img src="img/empty_trash.png" alt="">
        </button>
    </div>
</div>
`
}

function greateDeleteContactPoup(i, deleteChosenContact) {
    return /*html*/`
    <div class="delete-popup" onclick="doNotClose(event)">
        <div class="delete-texts">
            <h1 class="delete-popup-headline">Delete Contact</h1>
            <p class="delete-popup-text">Are you sure you want to delete</p>
            <p class="delete-contact-name" id="deleteContactName">${deleteChosenContact.name.charAt(0).toUpperCase() + deleteChosenContact.name.slice(1).toLowerCase()} ${deleteChosenContact.surname.charAt(0).toUpperCase() + deleteChosenContact.surname.slice(1).toLowerCase()}?</p>
            <div class="delete-contact-name-border"></div>
        </div>
        <div class="delete-btns">
            <div class="transparent-btn delete-cancel" onclick="closeDeletePopup()">
                <p>No</p>
            </div>
            <div class="dark-btn delete-confirmation" onclick="deleteContact(${i})">
                Yes
            </div>
        </div>
    </div>
    `
}


function greateSelectedContact(selectedContact) {
    return /*html*/ `
        <div class="color-circle-contact" style="background-color: ${selectedContact['profilecolor']}">
            ${selectedContact['Initials']}
        </div>
    `
}

function greatContact(contact, i) {
    return /*html*/ `
    <div class="contact">
        <span>${contact['name']} ${contact['surname']}</span>
        <input onclick="addContactsToArray()" id="checkbox${i}" type="checkbox">
    </div>`
}

function createAddPhoneNummber(i) {
    return/*html*/`
            <p class="weight-1000">Phone</p>
            <p onclick="editContact(${i})" class="add-phone-number">Add a phone number</p>`
}