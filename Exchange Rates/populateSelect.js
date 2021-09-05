const selects = document.querySelectorAll('.currency-list');

function populateSelect(currencyCodes) {
	Object.entries(currencyCodes).forEach(([currencyCode, { name }]) => {
		const opt = document.createElement('option');
		opt.value = currencyCode;
		opt.innerHTML = `${name} (${currencyCode})`;

		selects[0].appendChild(opt);
		selects[1].appendChild(opt.cloneNode(true));
	});
}

fetch('./iso-4217 currency codes.json')
	.then(response => response.json())
	.then(data => populateSelect(data))
	.catch(console.error);
