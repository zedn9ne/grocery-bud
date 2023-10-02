// ****** Select Items ******
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = "";  

// ****** Event Listeners ******
// submit form
form.addEventListener('submit', addItem);
// clear items
clearBtn.addEventListener('click', clearItems);
// load items
window.addEventListener('DOMContentLoaded', setupItems);
// ****** Functions ******
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if (value && !editFlag) {
        createListItem(id, value);
        displayAlert('item added to list', 'correct')
        // show container
        container.classList.add('grocery-container-show');
        // add localstorage 
        addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();
    }
    else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('value changed', 'correct');
        // edit local storage
        editLocalStorage(editID, value);
        setBackToDefault();
    }
    else {
        displayAlert('please enter value', 'danger');
        
    }
}

// delete items 
function deleteItem (e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    displayAlert('item has been deleted', "correct");
    setBackToDefault();
    if (list.children.length === 0) {
        container.classList.remove('grocery-container-show')
    }

    // rm from local storage
    removeFromLocalStorage(id);
}
// edit items 
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value 
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = 'edit';
}

// display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // remove alarm
    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);

    },800)
}

// clear items
function clearItems() {
    const items = document.querySelectorAll('.grocery-item');

    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item);
        })
        container.classList.remove('grocery-container-show');
        displayAlert('empty list', 'danger');
        setBackToDefault();
        localStorage.removeItem("list");
    }
}

// set back to default
function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = 'submit';
}


// ****** Local Storage ******
function addToLocalStorage(id, value) {
    const grocery = { id, value };
    let items = getLocalStorage();
    console.log(items);
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
    
}
function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    items = items.filter(function (item) {
        if (item.id !== id) {
            return item;
        }
    })
    localStorage.setItem('list', JSON.stringify(items));
}
function editLocalStorage(id, value) { 
    let items = getLocalStorage();
    items = items.map(function (item) {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem('list', JSON.stringify(items));
}
function getLocalStorage() {
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}

// ****** Setup Items ******
function setupItems() {
    let items = getLocalStorage();

    if (items.length > 0) {
        items.forEach(function (item) {
            createListItem(item.id, item.value);
        })
        container.classList.add('grocery-container-show');
    }
}
function createListItem(id , value) {
    const element = document.createElement('article');
        // add class
        element.classList.add('grocery-item');

        // add id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);

        element.innerHTML = `<i class="fa-solid fa-tag mark"></i>
        <p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;

        // delete and edit 
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        editBtn.addEventListener('click', editItem);
        deleteBtn.addEventListener('click', deleteItem);

        // append child
        list.appendChild(element);
}





// LocalStorage API
// setItem
// getItem
// removeItem
// save as strings
// localStorage.setItem('orange', JSON.stringify(['item', 'item2']));
// localStorage.setItem('example', JSON.stringify(['example 1', 'example 2']));
// const oranges = JSON.parse(localStorage.getItem('orange'));
// const examples = JSON.parse(localStorage.getItem('example'));
// console.log(oranges);
// localStorage.removeItem('orange');