/* TEMPLATES FOR BORD.HTML/BORD.JS */

function templateRenderCardsIntoTheBoard(i, id, category, categoryColor, title, description, prioImage, status) {
    return /*html*/`<div onclick="openTaskOverviewDialogBord(${i})" id="card${i}" ondragstart="startDragging(${i}, '${status}')" ondragend="endDragging(${i})" draggable="true" class="task-card-bord  dialog-design">
                    <span class="task-card-category" style="background-color:${categoryColor} ;">${category}</span>
                    <span class="task-card-title">${title}</span>
                    <span class="task-card-description">${description}</span>
                <div id="progressbarId${i}" class="task-card-progressbar-container"></div>
                    <div class="task-card-ass-prio-container">
                        <div id="contactsId${i}" class="task-card-assigned"></div>
                        <img class="task-card-prio" src="img/${prioImage}" alt="">
                    </div>
                </div>
            </div>        
`;
}

function templateRenderContactsIntoTheCard(initials, backgroundColor) {
    return /*html*/`<div class="task-card-contact-icon" style="background-color: ${backgroundColor};">${initials}</div>`;
}

function templateSubtasksInToOverview(i, subtask, z) {
    return /*html*/`
    <div class="taskoverview-subtask-row">
        <input type="checkbox" id="checkboxId${z}" onclick="subtasksCheckBoxClick(${i},${z})">
        <span>${subtask}</span>
    </div>
`;
}

function templateRenderContactsInToOverview(name, surname, initials, color) {
    return /*html*/`<div class="taskoverview-contact">
        <div class="taskoverview-contact-icon" style="background-color:${color}">${initials}</div>
        <span class="taskoverview-span-right">${name} ${surname} </span>
    </div>  
    `;
}

function templateRenderTaskInToOverview(i, category, categoryColor, title, description, date, prio, prioImage, prioColor) {
    return /*html*/`<span class="taskoverview-category" style="background-color:${categoryColor}">${category}</span>
    <span class="taskoverview-title">${title}</span>
    <span class="taskoverview-description">${description}</span>
    <div id="overviewSubtasksId" class="taskoverview-subtask">

    </div>
    <div class="taskoverview-duedate">
        <span class="taskoverview-span-left">Due date:</span>
        <span class="taskoverview-span-right">${date}</span> 
    </div>
    <div class="taskoverview-prio">
        <span class="taskoverview-span-left">Priority:</span>
        <span class="taskoverview-span-right taskoverview-prio-button" style= "background-color:${prioColor}">${prio}
        <img class="" src="img/${prioImage}" alt="">
        </span> 
    </div>
    <div class="taskoverview-assignto">
        <span class="taskoverview-span-over">Assigned To:</span>
    </div>
    <div id="taskoverview-contactsId" class="taskoverview-contacts">
    </div>
<div class="taskoverview-editbutton-container">
    <button onclick="renderEditTaskDialog(${i})" class="dark-btn edit-button">
        <img src="img/edit_pen_white.svg" alt="">
    </button>
</div>`;
}

function templateEditTask(i) {
    return /*html*/`
            <div class="edit-task-container">
                <div class="add-task-headline">
                <h1>Edit Task</h1>
                </div>

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
                    <p class="required" id="required2"></p>
                </div>
                
                <!-- Date input -->
                <div class="input-container">
                    <label>Due date</label>
                    <div class="input-field due-date">
                        <input id="due-date" type="date" placeholder="dd/mm/yyyy" min="2023-03-15">
                    </div>
                    <p class="required" id="required3"></p>
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
                    <p class="required" id="required4"></p>
                </div>

                <div class="input-container">
                    <label>Status</label>
                    <div class="toggle-menu">
                        <div class="assigned-to" onclick="toggleMenuCategory('toggle-3')">
                            <span id="status"></span>
                            <img src="./img/triangle.svg">
                        </div>
                        <div id="toggle-3" class="selection d-none">  
                        <div onclick="changeStatusByEditTask('toDo')" class="contact">                        
                                <span>To do</span>
                                </div>
                        <div  onclick=changeStatusByEditTask('toProgress') class="contact">  
                                <span>In progress</span>
                        </div>
                        <div onclick=changeStatusByEditTask('awaitingFeedback') class="contact">  
                            <span>Awaiting Feedback</span>
                        </div> 
                        <div onclick=changeStatusByEditTask('done')  class="contact">  
                                <span>Done</span>
                        </div>    
                        
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div class="taskoverview-editbutton-container">
                <div class="edit-button-content">
                    <button onclick="openDeleteTaskPopup(${i})" class="dark-btn edit-button-trash">
                    <img src="img/empty_trash.png" alt="">
                    </button>
                    <button onclick="saveEditTask(${i})" class="dark-btn edit-button-ok">
                    <span>Ok</span>
                    <img src="img/hook_white.svg" alt="">
                    </button>
                </div>
                </div>
`;
}

function templateAddTaskDialog() {
    return /*html*/`
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
                    <div class="subtasks-container" id="subtasks-container"></div>
                </div>
            </div>
        </div>
        <!-- Clear and Create Buttons -->
        <div class="add-task-buttons">
            <button onclick="resetForm()" class="transparent-btn clear-btn"><span>clear
                    x</span></button>
            <button onclick="createTaskOnBoard()" type="submit" class="dark-btn create-btn">
                <span>Create Task</span>
                <img src="./img/tick_white.svg">
            </button>
        </div>
    `
}

function templateNeedBar(i, checkSubtask, percentBar) {
    return /*html*/`<div class="task-card-progressbar">
                <div id="barId(${i})" class="task-card-bar" style="width:${percentBar}%;" ></div>
            </div>
            <span>${checkSubtask} Done</span>`;
}

function templateDeleteTaskPopup(i) {
    return /*html*/`<div class="delete-texts">
    <h1 class="delete-popup-headline">Delete Task</h1>
    <p class="delete-popup-text">Are you sure you want to delete the Task</p>
    <div>
    <p class="delete-task-name">${tasks[i].title}</p>
    <div id="delete-task-name-borderId" class="delete-task-name-border"></div>
    </div>
</div>
<div class="delete-btns">
    <div class="transparent-btn delete-cancel" onclick="slideOutDeleteTaskPopup()">
        <p>No</p>
    </div>
    <div class="dark-btn delete-confirmation" onclick="deleteTask(${i})">
        Yes
    </div>
</div>
`
}