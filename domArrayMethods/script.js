// variables
 const main = document.getElementById('main');
 const addUserBtn = document.getElementById('add-user');
 const doubleBtn = document.getElementById('double');
 const showMillionairesBtn = document.getElementById('show-millionaires');
 const sortBtn = document.getElementById('sort');
 const calculateWealthBtn = document.getElementById('calculate-wealth');



let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    //console.log(data);
    const user = data.results[0];

    const newUser = {
        name:`${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    //console.log(newUser);
    addData(newUser);
}

// Double everyones money
// using map instead of forEach- map returns a new array whereas forEach affects & changes the original array
function doubleMoney () {
    data = data.map((user) => {
        return {...user, money: user.money * 2 };
        // used spread operator so the new data object still includes name by copying over everything from the user object and then overriding the money property
    });

    updateDOM();
}

// Sort users by richest
// in descending compare operator used b.money instead of just b-a because theyre objects, not single numbers
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

// filter only millionaires
function showMillionaires() {
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

// Calculate total wealth using reduce function
function calculateWealth() {
    // reduce function takes in accumulator and user. Then returns the accumulated result with user.money appended on b/c user is the object, whereas is money is the value we actually want. Starts @ 0
    const wealth = data.reduce((acc, user) => (acc += 
    user.money), 0);

    // putting it in the dom
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);

} 

//Add new object to data array
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// Update Dom
function updateDOM(providedData = data) {
    //clear the main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element );
    });
}

//format number as money- https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}



//Event Listeners

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);