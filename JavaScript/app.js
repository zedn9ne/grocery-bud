// ****** Select Items ******
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.container');
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
        console.log('add item');
    }
    else if (value && editFlag) {
        console.log('editing item');
    }
    else {
        console.log('empty');
    }
}
// ****** Local Storage ******
// ****** Setup Items ******
