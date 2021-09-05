const currency1 = document.getElementById('currency-list-1');
const currency2 = document.getElementById('currency-list-2');
let amount1 = document.getElementById('amount-1');
let amount2 = document.getElementById('amount-2');
const swap = document.getElementById('swap');
const rate = document.getElementById('rate');

const URL =
	'https://prime.exchangerate-api.com/v5/614ca289c63cd72e7769a13f/latest/';

let exchangeRate = 1;
let currAmountElement = amount1;

// update rate on screen and calculate exchange
function updateRate() {
	let rateString = `1${currency1.value} = ${exchangeRate}${currency2.value}`;
	rate.innerText = rateString;
}

function updateAmounts() {
	amount2.value = (+amount1.value * exchangeRate).toFixed(2);
}

// fetch rates from api
async function fetchRates() {
	try {
		const response = await fetch(`${URL}${currency1.value}`);
		const data = await response.json();
		if (data.error) throw data.error;

		exchangeRate = data.conversion_rates[currency2.value];
	} catch (data_1) {
		return console.error(data_1);
	}
}

// swap
function onSwapCurrencies() {
	let v1 = currency1.value;
	let v2 = currency2.value;

	currency1.value = v2;
	currency2.value = v1;

	exchangeRate = (1 / exchangeRate).toFixed(4);
	updateRate();
	updateAmounts();
}

async function onCurrencyChange() {
	await fetchRates();
	updateRate();
	updateAmounts();
}

function onAmountChange(e) {
	if (e.currentTarget !== currAmountElement) {
		currAmountElement = e.currentTarget;
		[amount1, amount2] = [amount2, amount1];
	}

	updateAmounts();
}

// event listeners
currency1.addEventListener('change', onCurrencyChange);
currency2.addEventListener('change', onCurrencyChange);
amount1.addEventListener('input', onAmountChange);
amount2.addEventListener('input', onAmountChange);
swap.addEventListener('click', onSwapCurrencies);
