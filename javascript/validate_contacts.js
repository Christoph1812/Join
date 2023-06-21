const nameRegexContact = /^[a-zA-Z]+\s[a-zA-Z]+$/;
const emailRegexContact = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegexContact = /^\d{10,15}$/;

/**
 * This function loads contacts from the backend, sorts them alphabetically by name, and renders them
 * in a grouped format on the webpage.
 * @returns If the `contactListDiv` element is not found, the function will exit and return nothing.
 */
async function loadContacts() {
    await loadContactsfromBackend();
    const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
    const contactListDiv = document.getElementById('contactlist');
    createContactsPage(sortedContacts, contactListDiv);
}


/**
 * The function validates contact information and creates a new contact if all information is valid.
 */
function validateContact() {
    const [nameValue, emailValue, phoneValue] = getInput('newContactName', 'newContactEmail', 'newContactPhone');
    const isValidName = validateContactInput(nameValue, nameRegexContact, 'nameError', 'Please enter a valid name (first and last name).');
    const isValidEmail = validateContactInput(emailValue, emailRegexContact, 'emailError', 'Please enter a valid email address.');
    const isValidPhone = validatePhone(phoneValue, phoneRegexContact, 'phoneError', 'Please enter a valid phone number (10-15 digits).');

    if (isValidName && isValidEmail && isValidPhone) {
        return true;
    } else
        return false;
}

/**
 * This fuction is used to get the values form form input
 * 
 * @param {string} nameID - ID name input
 * @param {string} emailID -ID email input
 * @param {string} phoneID -ID phone input
 * @returns 
 */
function getInput(nameID, emailID, phoneID) {
    const nameValue = document.getElementById(nameID).value;
    const emailValue = document.getElementById(emailID).value;
    const phoneValue = document.getElementById(phoneID).value;
    return [nameValue, emailValue, phoneValue];
}


/**
 * This function validates and updates a contact's information, saves it to the backend, and displays a
 * confirmation popup.
 */
function validateEditContact() {
    const [nameValue, emailValue, phoneValue] = getInput('editContactName', 'editContactEmail', 'editContactPhone');
    const isValidName = validateContactInput(nameValue, nameRegexContact, 'editNameError', 'Please enter a valid name (first and last name).');
    const isValidEmail = validateContactInput(emailValue, emailRegexContact, 'editEmailError', 'Please enter a valid email address.');
    const isValidPhone = validatePhone(phoneValue, phoneRegexContact, 'editPhoneError', 'Please enter a valid phone number (10-15 digits).');
    createEditContact(isValidName, isValidEmail, isValidPhone, nameValue, emailValue, phoneValue);
}

/**
 * This function is used to create a added contact
 * 
 * @param {boolean} isValidName - validate name
 * @param {boolean} isValidEmail -validate email
 * @param {boolean} isValidPhone -validate Phonenummber
 */
async function createEditContact(isValidName, isValidEmail, isValidPhone, nameValue, emailValue, phoneValue) {
    const editContactContainer = document.querySelector('.edit-contact-container');
    const i = editContactContainer.dataset.contactIndex;
    const contact = contacts[i];

    if (isValidName && isValidEmail && isValidPhone) {
        updateContact(contact, nameValue, emailValue, phoneValue);
        showConfirmationPopup('editcontact');
        await saveContactstoBackend(contacts);
        closeEditContactForm();
        loadContacts();
        showContactInfo(i);
    }
}


function validateContactInput(inputValue, regex, errorID, errormessage) {
    if (!regex.test(inputValue)) {
        showErrorMessage(errorID, errormessage);
        return false;
    } else {
        hideErrorMessage(errorID);
        return true;
    }
}


/**
 * The function validates a phone number input and displays an error message if the input is invalid.
 * @param phoneValue - The phone number value that needs to be validated.
 * @param errorId - The ID of the HTML element where the error message should be displayed if the phone
 * number is invalid.
 * @returns a boolean value (true or false) depending on whether the phone number input is valid or
 * not. If the phone number is empty, it returns true. If the phone number is not empty, it checks if
 * it matches the regular expression pattern for a valid phone number (10-15 digits) and returns true
 * if it does, and false if it doesn't. In both cases
 */
function validatePhone(inputValue, regex, errorID, errormessage) {
    if (inputValue === '') {
        hideErrorMessage(errorID);
        return true;
    }
    if (validateContactInput(inputValue, regex, errorID, errormessage)) {
        return true;
    } else {
        return false;
    }
}


/**
 * This function creates a new contact object and saves it to the backend if the name and email input
 * values pass regex tests.
 */
async function createNewContact() {
    if (validateContact()) {
        await loadContactsfromBackend();
        const newContact = createNewContactObject();
        showConfirmationPopup('addcontact');
        contacts.push(newContact);
        await saveContactstoBackend(contacts);
        await loadContacts();
        const newContactIndex = contacts.findIndex(contact => contact === newContact);
        if (newContactIndex >= 0) {
            showContactInfo(newContactIndex);
        }
        closeForm();
    }
}


/**
 * It validates the input fields and if they are valid, it calls the createNewContact() function.
 * @param id - The id of the element to show the error message in.
 * @param message - The message to be displayed in the alert box.
 */
function showErrorMessage(id, message) {
    const errorLabel = document.getElementById(id);
    errorLabel.innerHTML = message;
    errorLabel.style.display = 'block';
}


/**
 * The function hides an error message by setting its display property to 'none'.
 * @param id - The parameter "id" is a string that represents the id attribute of an HTML element. This
 * function uses the id to select the element and hide it by setting its display property to "none".
 */
function hideErrorMessage(id) {
    const errorLabel = document.getElementById(id);
    errorLabel.style.display = 'none';
}


/**
 * The function updates a contact object with new name, email, and phone number values.
 * @param contact - an object representing a contact with properties such as name, surname, email, and
 * phonenumber.
 * @param nameValue - A string value representing the full name of the contact, with the first name and
 * last name separated by a space.
 * @param emailValue - The email value parameter is a string that represents the email address of a
 * contact.
 * @param phoneValue - phoneValue is a parameter that represents the phone number value of a contact.
 * It is used in the function updateContact to update the phone number of a contact object.
 */
function updateContact(contact, nameValue, emailValue, phoneValue) {
    contact.name = nameValue.split(' ')[0];
    contact.surname = nameValue.split(' ')[1];
    contact.email = emailValue;
    contact.phonenumber = phoneValue;
}


/**
 * The function fills in the fields of an edit contact form with the information from a given contact
 * object.
 * @param contact - The parameter "contact" is an object that contains information about a contact,
 * including their name, surname, email, and phone number.
 */
function fillInEditContactFormFields(contact) {
    document.getElementById('editContactName').value = contact.name + ' ' + contact.surname;
    document.getElementById('editContactEmail').value = contact.email;
    document.getElementById('editContactPhone').value = contact.phonenumber;
}


/**
 * This function is used to show the contact page
 * 
 * @param {Array} sortedContacts -sorted array by initial letter
 * @param {*} contactListDiv - Id for the Contact div Container
 * @returns 
 */
function createContactsPage(sortedContacts, contactListDiv) {
    if (!contactListDiv) {
        return; // Exit the function if the contactListDiv element is not found
    }
    contactListDiv.innerHTML = ''; // Clear the contactListDiv content
    contactListDiv.innerHTML += greateContactListHeadline(),
        usedIds = new Set(contacts.map(contact => parseInt(contact.contactid)));
    if (contacts.length === 0) {
        renderNoContacts(contactListDiv);
    } else {
        document.getElementById('newcontactbtn').classList.remove('d-none');
        renderGroupedContacts(contactListDiv, sortedContacts); // Call the new function here
    }
}


/**
 * The function renders a message and a button to add new contacts if there are no contacts in the
 * contact list.
 * @param contactListDiv - The HTML element where the list of contacts will be rendered.
 */
function renderNoContacts(contactListDiv) {
    document.getElementById('newcontactbtn').classList.add('d-none');
    contactListDiv.innerHTML += greateNoContacts();
}

/**
 * The function renders a list of grouped contacts in alphabetical order with a header for each group.
 * @param contactListDiv - The HTML element where the grouped contacts will be rendered.
 * @param sortedContacts - an array of objects representing contacts, sorted alphabetically by name.
 * Each object has properties such as name, phone number, and email address.
 */
function renderGroupedContacts(contactListDiv, sortedContacts) {
    let currentChar = '';
    for (let i = 0; i < sortedContacts.length; i++) {
        const list = sortedContacts[i];
        if (list.name.charAt(0) != currentChar) {
            currentChar = list.name.charAt(0);
            if (!document.getElementById(`char-${currentChar.toUpperCase()}`)) {
                contactListDiv.innerHTML += /*html*/ `
                <div class="contact-char" id="char-${currentChar.toUpperCase()}"><p>${currentChar.toUpperCase()}</p></div> `
            }
        }
        contactListDiv.innerHTML += greateContactItem(list, i);
    }
}


/**
 * The function limits the maximum length of an email address and adds ellipsis if necessary.
 * @param email - The email parameter is a string representing an email address.
 * @param [maxLength=28] - The maximum length that the email string can be before it is truncated. The
 * default value is 28 characters if no value is provided when the function is called.
 * @returns a modified version of the input email string. If the length of the email is less than or
 * equal to the maxLength parameter, the original email is returned. If the length of the email is
 * greater than maxLength, the function returns a truncated version of the email with an ellipsis (...)
 * added to the end.
 */
function maxEmailChar(email, maxLength = 28) {
    if (email.length <= maxLength) {
        return email;
    } else {
        return email.slice(0, maxLength - 3) + '...';
    }
}


/**
 * The function returns a combined name and surname string, truncated to a maximum length of 18
 * characters.
 * @param name - The first name of a person.
 * @param surname - The parameter "surname" is a string variable that represents the last name of a
 * person.
 * @param [maxLength=18] - The maximum length of the combined name and surname string. If the length of
 * the combined string is greater than maxLength, the function will truncate the surname and add
 * ellipsis to the end of the name. The default value of maxLength is 18.
 * @returns If the length of the combined name is less than or equal to the maxLength parameter, the
 * function will return the combined name. Otherwise, it will return the first 13 characters of the
 * name followed by ellipsis.
 */
function maxNameSurnameChar(name, surname, maxLength = 18) {
    const combinedName = name + ' ' + surname;
    if (combinedName.length <= maxLength) {
        return combinedName;
    } else {
        return name.slice(0, 13) + '...';
    }
}


/**
 * The function displays the contact information of a selected contact and highlights it in the list of
 * contacts.
 * @param i - The parameter "i" is an index that represents the position of a contact in an array of
 * contacts. It is used to access the specific contact information in the "contacts" array and to
 * highlight the selected contact in the user interface.
 */
function showContactInfo(i) {
    const contactinfo = contacts[i];
    const formattedName = contactinfo.name.charAt(0).toUpperCase() + contactinfo.name.slice(1).toLowerCase();
    const formattedSurname = contactinfo.surname.charAt(0).toUpperCase() + contactinfo.surname.slice(1).toLowerCase();
    const formattedEmail = contactinfo.email.toLowerCase();
    const showClickedContact = document.getElementById('contactinfo');
    document.querySelector('.contact-info-section').style.display = 'block';
    renderContactInfo(formattedName, formattedSurname, formattedEmail, showClickedContact, contactinfo, i);
    const highlightContact = document.getElementsByClassName('contacts');
    for (let j = 0; j < highlightContact.length; j++) {
        highlightContact[j].classList.remove('selected-contact-info');
    }
    highlightContact[i].classList.add('selected-contact-info');
}


/**
 * The function renders contact information and options for editing and deleting a contact.
 * @param formattedName - A string containing the formatted first name of the contact.
 * @param formattedSurname - A string variable containing the formatted surname of the contact.
 * @param formattedEmail - A string variable that contains the formatted email address of the contact.
 * @param showClickedContact - This is a DOM element where the rendered contact information will be
 * displayed.
 * @param contactinfo - an object containing information about a contact, including their initials,
 * profile color, phone number, and email address
 * @param i - The index of the contact in the contacts array.
 */
function renderContactInfo(formattedName, formattedSurname, formattedEmail, showClickedContact, contactinfo, i) {
    let phoneNumberHTML;
    if (contactinfo.phonenumber === '') {
        phoneNumberHTML = createAddPhoneNummber(i)
    } else {
        phoneNumberHTML = /*html*/`
            <p class="weight-1000">Phone</p>
            <p>${contactinfo.phonenumber}</p>`;
    }
    showClickedContact.innerHTML = greateClickedContact(formattedName, formattedSurname, formattedEmail, contactinfo, i, phoneNumberHTML);
}


/**
 * The function renders a selected contact's profile color and initials in a color circle container.
 * @param contactIndex - The index of the selected contact in the `contacts` array.
 */
function renderSelectedContact(contactIndex) {
    const selectedContact = contacts[contactIndex];
    const colorContainer = document.getElementById('inicial-circles');
    colorContainer.innerHTML = greateSelectedContact(selectedContact);
}


/**
 * The function renders a list of contacts with checkboxes.
 */
function renderContacts() {
    let contactContainer = document.getElementById('contact-container');
    contactContainer.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        contactContainer.innerHTML += greatContact(contact, i);
    }
}


/**
 * The function selects a contact by its index and adds its ID to an array.
 * @param contactIndex - The index of the contact in the "contacts" array that is being selected.
 */
function selectContact(contactIndex) {
    document.querySelectorAll("input[type = 'checkbox'")[contactIndex];
    selectedContacts.push(contacts[contactIndex]['contactid']);
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
 * This function saves an array of contacts as a JSON string to the backend using the backend.setItem()
 * method.
 * @param contacts - The `contacts` parameter is an array of objects representing contact information.
 * Each object in the array should have properties such as name, email, phone number, etc.
 */
async function saveContactstoBackend(contacts) {
    const contactsJson = JSON.stringify(contacts);
    await backend.setItem('contacts', contactsJson);
}
