const main = document.getElementById("main");
const addUserBtn = document.getElementById("addUser");
const doubleBtn = document.getElementById("double");
const millionairesBtn = document.getElementById("millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculateWealth");

let data = [],
    inititalNumberOfUsers = 3;

for (let i = 0; i < inititalNumberOfUsers; ++i)
    getRandomUser();

// fetch random user and add money
async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api/");
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 2000000)
    };

    addData(newUser);
}

// add new obj to data arr
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// update DOM
function updateDOM(providedData = data) {
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(user => {
        const element = document.createElement('div');
        element.classList.add('person');

        element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;

        main.appendChild(element);
    });
}

// format number as money
function formatMoney(number) {
    return '₹‎' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// double everyone's money
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });

    updateDOM();
}

// sort data according to money in descending order
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

// filter out millionaires
function showMillionaires() {
    let millionaires = data.filter(user => user.money >= 1000000);

    updateDOM(millionaires);
}

// toggle filtering only millionaires
function toggleMillionaires(event) {
    let text = event.target.innerHTML;

    if (text === "show only millionares 💵") {
        millionairesBtn.innerHTML = "show all 💵";
        showMillionaires();
    } else {
        millionairesBtn.innerHTML = "show only millionares 💵";
        updateDOM();
    }
}

// calculate total wealth
function totalWealth() {
    const wealth = data.reduce(
        (accumulator, currentValue) => accumulator + currentValue.money
        , 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <string>${formatMoney(wealth)}</string></h3>`

    main.appendChild(wealthEl);
}


// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
millionairesBtn.addEventListener('click', toggleMillionaires);
calculateWealthBtn.addEventListener('click', totalWealth);