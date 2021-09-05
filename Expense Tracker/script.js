const balanceDisplay = document.getElementById('balance'),
	incomeDisplay = document.getElementById('income'),
	expenseDisplay = document.getElementById('expense'),
	historyDisplay = document.getElementById('history'),
	textInput = document.getElementById('text'),
	amountInput = document.getElementById('amount'),
	form = document.getElementById('form');

const storage = window.localStorage;
const storageKey = 'transactions';
const initialStorageObject = {
	balance : 0,
	income  : 0,
	expense : 0,
};

// initialize
function init () {
	let storageData = storage.getItem(storageKey);
	if (!storageData) {
		storage.setItem(storageKey, JSON.stringify(initialStorageObject));
		displayMoney(0, 0, 0);
		return;
	}

	historyDisplay.innerHTML = '';
	storageData = JSON.parse(storageData);

	for (const transaction in storageData) {
		if (+transaction) {
			addNewTransactionToDOM(
				transaction,
				storageData[transaction].text,
				storageData[transaction].amount,
			);
		}
	}

	displayMoney(
		storageData['balance'],
		storageData['income'],
		storageData['expense'],
	);
}

// hash generator
function hashCode (text) {
	let hash = 0,
		i,
		chr;
	for (i = 0; i < text.length; i++) {
		chr = text.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}

// add to storage
function addToStorage (text, amount) {
	let recentInput = {
		text   : text,
		amount : amount,
		offset : 0,
	};
	let id = hashCode(text);

	let storageData = JSON.parse(storage.getItem(storageKey));
	while (Object.keys(storageData).indexOf(id.toString()) !== -1) {
		id += 10;
		recentInput.offset = id;
	}

	storageData[id] = recentInput;

	storage.setItem(storageKey, JSON.stringify(storageData));

	return id;
}

// add transaction to DOM
function addNewTransactionToDOM (id, text, amount) {
	let signText = amount >= 0 ? 'plus' : 'minus';
	let signSymbol = amount >= 0 ? '+' : '';

	let DOMDataElement = `
        <li class="history-item ${signText}" data-id="${id}">
            <button class="deleteBtn"><i class="fas fa-trash"></i></button>
            <span class="text">${text}</span>
            <span class="amount money">${signSymbol + amount}</span>
        </li>
    `;

	historyDisplay.innerHTML += DOMDataElement;
}

// add new transaction
function formSubmitHandler (event) {
    event.preventDefault();

	let text = textInput.value;
    let amount = parseFloat(amountInput.value).toFixed(2);

	let id = addToStorage(text, amount);
	addNewTransactionToDOM(id, text, amount);
	calculateBalance(amount);

	amountInput.value = '';
	textInput.value = '';
}

function displayMoney (balance, income, expense) {
	balanceDisplay.textContent = balance;
	incomeDisplay.textContent = income;
	expenseDisplay.textContent = expense;
}

// calculate total Balance
function calculateBalance (transactionAmount) {
	transactionAmount = +transactionAmount;
	let storageData = JSON.parse(storage.getItem(storageKey));
	storageData['balance'] += transactionAmount;

	if (transactionAmount >= 0) {
		storageData['income'] += transactionAmount;
	}
	else {
		storageData['expense'] += transactionAmount;
	}

	storage.setItem(storageKey, JSON.stringify(storageData));

	displayMoney(
		storageData['balance'],
		storageData['income'],
		storageData['expense'],
	);
}

// delete transaction form Storage
function deleteFromStorage (id) {
	let storageData = JSON.parse(storage.getItem(storageKey));

    let data = storageData[id];   

    storageData['balance'] -= data.amount;
    if(data.amount >= 0) {
        storageData['income'] -= data.amount;
    }
    else {
        storageData['expense'] -= data.amount;
    }

	displayMoney(
		storageData['balance'],
		storageData['income'],
		storageData['expense'],
    );
    
    delete storageData[id];
    storage.setItem(storageKey, JSON.stringify(storageData));
}

// delete transaction DOM element
function deleteTransaction (event) {
	if (
		event.target.classList.contains('deleteBtn') ||
		event.target.classList.contains('fa-trash')
	) {
		let parent = event.target.parentNode;

		while (parent && !parent.classList.contains('history-item')) {
			parent = parent.parentNode;
        }
        
        let parentId = parent.dataset.id;
        deleteFromStorage(parentId);

		parent.classList.add('remove');
		parent.addEventListener('transitionend', () => {
            parent.remove();
        });
	}
}

form.addEventListener('submit', formSubmitHandler);
historyDisplay.addEventListener('click', deleteTransaction);
window.addEventListener('load', init);
