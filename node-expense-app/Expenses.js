const form = document.querySelector('.myForm');
const msg = document.querySelector('.msg');
const btn = document.querySelector('#submit-btn');
const container = document.querySelector(".container");
let updateCheck = false;
let currentexpense = {};

form?.addEventListener('submit', onSubmit);

document.addEventListener('DOMContentLoaded', () => {

    //GET expenses from backend and populate the expenses display
    axios.get('http://localhost:4000/expenses')
        .then(res => {
            for (let expense of res.data) {
                displayexpenses(expense);
            }
        })
        .catch(err => { console.log(err) });
});


//add new expenses
function onSubmit(e) {

    e.preventDefault();
    const amt = document.querySelector('#amount');
    const desc = document.querySelector('#desc');
    const category = document.querySelector('#category')

    if (amt.value === '' || desc.value === '') {
        msg.classList.add('bg-danger')
        msg.classList.add('text-light')
        msg.innerHTML = 'Please enter values in all fields.'
        setTimeout(() => msg.remove(), 3000);
    }
    else {
        let expense = {
            amount: amt.value,
            description: desc.value,
            category: category.value
        }

        if (!updateCheck) {
            //POST expenses to backend
            axios.post('http://localhost:4000/expenses/add-expense', expense)
                .then((res) => {displayexpenses(res.data[res.data.length-1]) })
                .catch(err => { console.log(err) });
        }
        else {
            //update expenses if edit event is triggered
            let uId = currentexpense.id;
            axios.post(`http://localhost:4000/expenses/edit-expense`, {expenseId:uId, ...expense})
                .then((res)=>{
                    let data = res.data.find(expense=>expense.id===uId);
                    displayexpenses(data)}) //display data of the updated expense
                .catch(err => { console.log(err) });
            currentexpense = {};
            updateCheck = false;
        }
        amt.value = '';
        desc.value = '';
    }

}

//display existing expense appointments 
function displayexpenses(expense) {

    const amt = document.querySelector('#amount');
    const desc = document.querySelector('#desc');
    const category = document.querySelector('#category')

    let newDiv = document.createElement('div');
    newDiv.className = 'list-group-item mx-auto my-2 text-success w-50 rounded p-3 border border-success';
    newDiv.style = "font-weight:bold; font-size: 18px"
    newDiv.setAttribute('id', expense.id);

    let editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm btn-primary mx-2 float-right';
    editBtn.textContent = 'Edit'
    editBtn.addEventListener('click', (e) => {
        
        //remove contents from display
        let delDiv = document.getElementById(expense.id);
        delDiv.innerHTML = '';
        delDiv.style.display = 'none';

        //populate registration form
        amt.value = expense.amount;
        desc.value = expense.description;
        category.value = expense.category;

        //edit expenses details after submit
        updateCheck = true;
        currentexpense = expense;
    })

    let delBtn = document.createElement('button');
    delBtn.textContent = 'X'
    delBtn.className = 'btn btn-sm btn-danger float-right';
    
    delBtn.addEventListener('click', (e) => {
        
        //delete expenses
        axios.post(`http://localhost:4000/expenses/delete-expense`, {expenseId: expense.id})
            .then(res => {
                 let delDiv = document.getElementById(expense.id);
                 delDiv.innerHTML = '';
                 delDiv.style.display = 'none';
            })
            .catch(err => { console.log(err) })
    })

    let data = document.createTextNode("Rs." + expense.amount + " | " + expense.category + " - " + expense.description);;
    newDiv.appendChild(data);
    newDiv.appendChild(delBtn);
    newDiv.appendChild(editBtn);

    container.appendChild(newDiv);
}



