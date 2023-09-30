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

// ****** Functions ******
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;

    const id = new Date().getTime().toString();
    if (value && !editFlag) {
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
            <button type="button" class="edit-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;
        list.appendChild(element);
        displayAlert('item added to list', 'correct')
        // show container
        container.classList.add('grocery-container-show');
        // add localstorage 
        // addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();
    }
    else if (value && editFlag) {
        console.log('editing item');
    }
    else {
        displayAlert('please enter value', 'danger');
        
    }
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

// set back to default
function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = 'submit';
}


// ****** Local Storage ******
function addToLocalStorage(id, value) {
    
}
// ****** Setup Items ******
