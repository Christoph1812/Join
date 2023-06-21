

/**
 * The function hides the contact information section if the window width is less than or equal to 1360
 * pixels.
 */
function hideContactInfo() {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 1360) {
        document.querySelector('.contact-info-section').style.display = 'none';
    }
}

/**
 * It uses the "stopPropagation" method to prevent the event from propagating further up the DOM tree.
 * @param {object} event 
 */
function doNotClose(event) {
    event.stopPropagation();
}


/**
 * The function focuses on the input field within a given container.
 * @param container - The container parameter is a reference to an HTML element that contains an input
 * field. The function uses this parameter to find the input field within the container and set focus
 * on it.
 */
function focusInputField(container) {
    const input = container.querySelector('input');
    input.focus();
}


/**
 * This function closes a form and hides any error messages associated with it.
 */
function closeForm() {
    const addNewContactContainer = document.querySelector('.add-new-contact-container');
    const addNewContactSection = document.querySelector('.add-new-contact-section');
    slideOutForm(addNewContactContainer, addNewContactSection)
    setTimeout(function () {
        disappearForm(addNewContactContainer, addNewContactContainer)
        deleteFormAfterClose();
        hideErrorMessage('nameError');
        hideErrorMessage('emailError');
        hideErrorMessage('phoneError');
    }, 500);
}


/**
 * The function closes an edit contact form by removing and adding CSS classes to hide the form with
 * animation effects.
 */
function closeEditContactForm() {
    const editContactContainer = document.querySelector('.edit-contact-container');
    const editContactSection = document.querySelector('.edit-contact-section');
    slideOutForm(editContactContainer, editContactSection)
    setTimeout(function () {
        disappearForm(editContactContainer, editContactSection)
    }, 500);
}


/**
 * This function is used to slide out the popup
 * @param {*} container - ID contact container 
 * @param {*} section - ID contact section
 */
function slideOutForm(container, section) {
    container.classList.remove('slide-in');
    section.classList.remove('fade-in');
    container.classList.add('slide-out');
    section.classList.add('fade-out');
}


/**
 * This fuction is used to disappear the poup
 *
 * @param {*} container - ID contact container
 * @param {*} section - ID contact section
 */
function disappearForm(container, section) {
    container.classList.add('d-none');
    container.classList.remove('slide-out');
    section.classList.remove('fade-out');
    section.classList.add('d-none');
}


/**
 * When the user clicks the button, the container and section are displayed, then the container slides
 * in and the section fades in. When the user clicks the section, the container slides out and the
 * section and container are hidden.
 */
function newContact() {
    const addNewContactContainer = document.querySelector('.add-new-contact-container');
    const addNewContactSection = document.querySelector('.add-new-contact-section');

    sildeIN(addNewContactContainer, addNewContactSection);

    addNewContactContainer.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    showpopup(addNewContactContainer, addNewContactSection);
}


/**
 * This fuction is used to slide in the poup
 * 
 * @param {*} container - ID contact container
 * @param {*} section  - ID contact section
 */
function sildeIN(container, section) {
    section.classList.remove('d-none');
    container.classList.remove('d-none');
    setTimeout(function () {
        container.classList.add('slide-in');
        section.classList.add('fade-in');
    }, 50);
}


/**
 * This fuction is used to slide in the poup
 * 
 * @param {*} container - ID contact container
 * @param {*} section - ID contact section
 */
function showpopup(container, section) {
    section.addEventListener('click', function () {
        container.classList.remove('slide-in');
        section.classList.remove('fade-in');
        container.classList.add('slide-out');
        setTimeout(function () {
            container.classList.add('d-none');
            container.classList.remove('slide-out');
            section.classList.add('d-none');
        }, 500);
    });
}


/**
 * The function clears the input fields of a form after it is closed.
 */
function deleteFormAfterClose() {
    const newContactNameInput = document.getElementById('newContactName');
    const newContactEmailInput = document.getElementById('newContactEmail');
    const newContactPhoneInput = document.getElementById('newContactPhone');
    newContactNameInput.value = '';
    newContactEmailInput.value = '';
    newContactPhoneInput.value = '';
}


/**
 * The function creates a new contact object with input values and generates a unique profile color and
 * initials.
 * @returns a new contact object with properties such as name, surname, email, profilecolor, Initials,
 * phonenumber, and contactid.
 */
function createNewContactObject() {
    const newContactNameInput = document.getElementById('newContactName');
    const newContactEmailInput = document.getElementById('newContactEmail');
    const newContactPhoneInput = document.getElementById('newContactPhone');
    const [name, surname] = newContactNameInput.value.split(' '); // Split the name into first and last name.
    const lastContactId = getNextContactId();
    const profileColor = getRandomDarkColor();
    const newContact = {
        'name': name,
        'surname': surname,
        'email': newContactEmailInput.value,
        'profilecolor': profileColor,
        'Initials': name[0].toUpperCase() + surname[0].toUpperCase(),
        'phonenumber': newContactPhoneInput.value,
        'contactid': lastContactId
    };
    return newContact;
}


/**
 * 
 * @returns This function is used to create a random color
 */
function getRandomDarkColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 3; i++) {
        let subcolor = letters[Math.floor(Math.random() * 16)];
        color += subcolor + subcolor; // make the subcolor darker by repeating it twice
    }
    return color;
}


// Function to get the next available contact ID
function getNextContactId() {
    highestUsedId++;
    const stringId = highestUsedId.toString();
    return stringId;
}


/**
 * The function "editContact" opens a form to edit a contact based on the index passed as a parameter.
 * @param i - The parameter "i" is likely an index or identifier for a specific contact that needs to
 * be edited. It is passed as an argument to the function "editContact", which then calls another
 * function "openEditContactForm" with the same argument. The purpose of this code is to allow the user
 */
function editContact(i) {
    openEditContactForm(i);
}


/**
 * This function opens an edit contact form and fills it with the details of a specific contact.
 * @param i - The index of the contact in the `contacts` array that needs to be edited.
 */
function openEditContactForm(i) {
    const contact = contacts[i];
    const editContactContainer = document.querySelector('.edit-contact-container');
    const editContactSection = document.querySelector('.edit-contact-section');
    const profileOfContact = document.getElementById('profileofcontact');
    profileOfContact.innerHTML = getProfileInitials(contact);
    fillInEditContactFormFields(contact);
    showEditContactForm(editContactContainer, editContactSection);
    attachEventListenersToCloseEditContactForm(editContactContainer, editContactSection);
    editContactContainer.dataset.contactIndex = i;
}


/**
 * The function shows an edit contact form by removing the 'd-none' class and adding animation classes.
 * @param editContactContainer - It is a variable that represents the container element that holds the
 * form for editing a contact.
 * @param editContactSection - It is a reference to a section element in the HTML document that
 * contains the form for editing a contact.
 */
function showEditContactForm(editContactContainer, editContactSection) {
    editContactSection.classList.remove('d-none');
    editContactContainer.classList.remove('d-none');
    setTimeout(function () {
        editContactContainer.classList.add('slide-in');
        editContactSection.classList.add('fade-in');
    }, 50);
}


/**
 * This function attaches event listeners to a close button and a section to close an edit contact
 * form.
 * @param editContactContainer - It is a DOM element that contains the form for editing a contact.
 * @param editContactSection - It is a reference to the HTML element that contains the form for editing
 * a contact.
 */
function attachEventListenersToCloseEditContactForm(editContactContainer, editContactSection) {
    editContactContainer.addEventListener('click', function (e) {
        e.stopPropagation();
    });
    editContactSection.addEventListener('click', function () {
        closeEditContactForm();
    });
}


/**
 * This function deletes a contact from an array, saves the updated array to a server, and then updates
 * the webpage with the new contact list.
 * @param i - The parameter "i" is the index of the contact to be deleted from the "contacts" array.
 */
async function deleteContact(i) {
    contacts.splice(i, 1);
    await saveContactstoBackend(contacts);
    document.getElementById('contactinfo').innerHTML = '';
    closeDeletePopup();
    await loadContacts();
    showConfirmationPopup('deletecontact');
    hideContactInfo();
}


/**
 * This function displays a popup asking the user to confirm the deletion of a contact and handles the
 * user's response.
 * @param i - The index of the contact to be deleted from the "contacts" array.
 */
function deleteContactPopup(i) {
    const deleteChosenContact = contacts[i];
    document.getElementById('deletenotification').classList.remove('d-none');
    document.getElementById('deletenotification').innerHTML = greateDeleteContactPoup(i, deleteChosenContact);
    const deleteContactName = document.querySelector('.delete-contact-name');
    const deleteContactNameBorder = document.querySelector('.delete-contact-name-border');
    updateBorderWidth(deleteContactName, deleteContactNameBorder);
    window.addEventListener('resize', updateBorderWidth);
    const deleteNotification = document.getElementById('deletenotification');
    const deletePopup = deleteNotification.querySelector('.delete-popup');
    deleteNotification.classList.add('visible');
    deleteNotification.classList.remove('d-none');
    deletePopup.classList.add('show');
}

/**
 * This function is used to update the border
 * 
 * @param {string} deleteContactName -id from contact name
 * @param {string} deleteContactNameBorder id from contact border
 */
function updateBorderWidth(deleteContactName, deleteContactNameBorder) {
    const width = deleteContactName.offsetWidth + 10;
    deleteContactNameBorder.style.width = width + 'px';
}


/**
 * this function is used to close the delete popup
 */
function closeDeletePopup() {
    const deleteNotification = document.getElementById('deletenotification');
    const deletePopup = deleteNotification.querySelector('.delete-popup');

    deletePopup.classList.remove('show');
    deleteNotification.classList.remove('visible');
    setTimeout(() => {
        deleteNotification.classList.add('d-none');
    }, 300);
}


/**
 * The function opens a dialog box for adding a task and renders it with the selected contact's
 * information.
 * @param contactIndex - The parameter `contactIndex` is a variable that represents the index of a
 * contact in a list or array. It is used as an argument to select and render the details of a specific
 * contact in the `openAddTaskDialogBord` function.
 */
async function openAddTaskDialogBord(contactIndex) {
    document.getElementById('overlay-bord-addTaskId').classList.remove('d-none');
    document.getElementById('bodyBordId').classList.add('overflow-dialog');
    selectContact(contactIndex);
    renderAddTaskDialog(contactIndex);
    setCurrentDate();
}


/**
 * This function renders an add task dialog with contact and category options, and selects a specific
 * contact if provided.
 * @param contactIndex - The parameter `contactIndex` is a variable that represents the index of the
 * selected contact in the list of contacts. It is used to render the selected contact in the add task
 * dialog.
 */
async function renderAddTaskDialog(contactIndex) {
    document.getElementById('add-task-contact-contentId').innerHTML = greateAddTaskDialog();
    renderContacts();
    renderCategory();
    renderSelectedContact(contactIndex);
}


/**
 * The function deletes the content of an HTML element with the ID 'add-task-contact-contentId'.
 */
function deleteAddTaskDialog() {
    document.getElementById('add-task-contact-contentId').innerHTML = "";
}


/**
 * This function creates a task for a contact on a board and saves it to the backend.
 */
async function createTaskForContactOnBoard() {
    resetRequired();
    if (checkRequired() == true) {
        await createTaskIntoJson();
        await saveTaskstoBackend();
        await saveCategorystoBackend();
        slideOutAddTaskDialogBord()
        showConfirmationPopup('createtask');
    }
    loadTasksfromBackend();
}