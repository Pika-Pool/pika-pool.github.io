const main = document.getElementById('main');
const addUserBtn = document.getElementById('addUser');
const doubleBtn = document.getElementById('double');
const millionairesBtn = document.getElementById('millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculateWealth');
const clear = document.getElementById('clear');

let data = [],
    inititalNumberOfUsers = 4;

for (let i = 0; i < inititalNumberOfUsers; ++i)
    getRandomUser();

// fetch a new user from api
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 2000000)
    };

    addUser(newUser);
}

// push a new user into database
function addUser(user) {
    data.push(user);

    updateDOM();
}

// update DOM with provided data
function updateDOM(providedData = data) {
    // clear main
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add('person');

        userElement.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;
        main.appendChild(userElement);
    });
}

// clear everything in the user list
function clearMain() {
    data = [];

    updateDOM();
}

// format number into money
function formatMoney(number) {
    return '₹‎' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// double each user's money
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });

    updateDOM();
}

// filter and display only millionaires
function showMillionaires() {
    let millionaires = data.filter(user => user.money >= 1000000);

    let text = event.target.innerHTML;
    if (text === "show only millionares 💵") {
        millionairesBtn.innerHTML = "show all 💵";
        updateDOM(millionaires);
    } else {
        millionairesBtn.innerHTML = "show only millionares 💵";
        updateDOM();
    }
}

// sort users into descending order of wealth
function sortByRichest()
{
    data = data.sort((a, b) => b.money - a.money);

    updateDOM();
}

// calculate and display total wealth
function totalWealth()
{
    const total = data.reduce(
        (accumulator, currentValue) => accumulator + currentValue.money
    , 0);

    const totalWealthElement = document.createElement('div');
    totalWealthElement.innerHTML = `<h3>Total: <strong>${formatMoney(total)}</strong></h3>`;

    main.appendChild(totalWealthElement);
}


// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
millionairesBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', totalWealth);

clear.addEventListener('click', clearMain);