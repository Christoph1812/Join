function greateHtmlRenderCategory(i) {
    return /*html*/`
    <div class="category">
        <div onclick="addToInput(${i}), toggleMenuCategory('toggle-1')" class="category-name">
            <span >${categorys[i]['name']}</span>
            <div class="color-circle" style="background-color: ${'' + categorys[i]['color']}"></div>
        </div>
        <img onclick="deleteCategory(${i})"src="./img/black-x.svg" >
    </div>`
}


function greateHtmlAddNewCategoryToInput(categoryInput) {
    return /*html*/`
    <div class="category-input">
        <div class="category-name">
            <span id="selected-category-name">${categoryInput}</span>
            <div class="color-circle" style="background-color: ${'' + currentColor}"></div>
        </div>
    </div>`
}

function greateHtmlAddInput(selectedCategoryColor, selectedCategoryName) {
    return /*html*/`
    <div class="category-input">
        <div class="category-name">
            <span id="selected-category-name">${selectedCategoryName}</span>
            <div class="color-circle" style="background-color: ${'' + selectedCategoryColor}"></div>
        </div>
    </div>`
}

function greateHtmlCategorColor(color, i) {
    return /*html*/`
    <div onclick="addColor('${color}')" id="circle${i}" class="color-circle" style="background-color: ${'' + color}"></div>`
}



