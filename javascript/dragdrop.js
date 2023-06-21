/**
 * This function is used to starts the dragging
 * 
 * @param {number} id - id is the number of the dragging task card
 */
function startDragging(id) {
    currentDraggedElement = id;
    rotateCardByDragging(id);
}


/**
 * This function is used to allow the dropping over the container field
 * 
 * @param {event} ev - event parameter
 * @param {number} id - id is the number of the dragging task card 
 */
function allowDrop(ev, id) {
    ev.preventDefault();
    onDropOverBorder(id);
}


function onDragLeave(id) {
    document.getElementById(id).classList.remove('ondroped');
}


/**
 * This function is used to displays a hover effect on a capable drop element
 * 
 * @param {number} id - id is the number of the dragging task card 
 */
function onDropOverBorder(id) {
    document.getElementById(id).classList.add('ondroped');
}


/**
 * This function is used to clear the hover effekt on the droped element
 * 
 * @param {string} status - field from the current status
 */
function onDropEnd(status) {
    id = status + 'Id';
    document.getElementById(id).classList.remove('ondroped');
}


/**
 * This function is used to completes the drag and drop process
 * 
 * @param {string} status - current dragging field
 */
async function moveTo(status) {
    let searchFieldId;
    tasks[currentDraggedElement].status = status;
    let inputSearchingField1 = document.getElementById('input-searchingId1').value;
    let inputSearchingField2 = document.getElementById('input-searchingId2').value;
    if (inputSearchingField1.length >= 1) searchFieldId = 1;
    if (inputSearchingField2.length >= 1) searchFieldId = 2;
    if (inputSearchingField1 == '' && inputSearchingField1 == '') await renderCardsIntoTheBoards();
    else filterTasksBySearching(searchFieldId);
    onDropEnd(status);
    await saveTaskstoBackend();
}


/**
 * This function is used to rotate the selected card by start dragging
 * 
 * @param {number} id - id is the number of the dragging task card 
 */
function rotateCardByDragging(id) {
    document.getElementById('card' + id).classList.add('rotate-card');
}


/**
 * This function is used to initiates functions when dragging is finished
 * 
 * @param {number} id - id is the number of the dragging task card  
 */
function endDragging(id) {
    rotateCardBack(id);
}


/**
 * This function is unsed to rotate the rotated card back
 * 
 * @param {number} id - id is the number of the dragging task card
 */
function rotateCardBack(id) {
    document.getElementById('card' + id).classList.remove('rotate-card');
}


/**
 * This function is used to checks the screen size and initiates functions accordingly and allow/ not allow drag&drop
 */
function checkWindowInnerScreenForDragAndDrog() {
    if (window.innerWidth > 1280) {
        for (let i = 0; i < cardAmounts.length; i++) {
            id = cardAmounts[i];
            document.getElementById('card' + id).draggable = true;
        }
        setMinHeightByScreenSizing('200px');
    } else {
        for (let i = 0; i < cardAmounts.length; i++) {
            id = cardAmounts[i];
            document.getElementById('card' + id).draggable = false;
        }
        setMinHeightByScreenSizing('0px');
    }
}


/**
 * This function is used to set the right min height from the status fields
 * 
 * @param {string} size - transmitted min height value
 */
function setMinHeightByScreenSizing(size) {
    document.getElementById('toDoId').style.minHeight = size;
    document.getElementById('toProgressId').style.minHeight = size;
    document.getElementById('awaitingFeedbackId').style.minHeight = size;
    document.getElementById('doneId').style.minHeight = size;
}