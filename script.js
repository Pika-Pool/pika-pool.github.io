const menu = document.getElementById('menu');

document.getElementById('hamburger').addEventListener('click', () => {
	menu.classList.toggle('show');
	console.log('hello');
});

document.getElementById('contact-form').addEventListener('submit', e => {
	e.preventDefault();

	const formEl = e.target;
	sendFormData(formEl).then(
		res => {
			if (!res.ok) {
				alert(
					'There was an error while sending the email. Try again after a while!!'
				);
				res.text().then(console.error);
				return;
			}
			alert('Email sent');
		},
		e => {
			console.error(e);
			alert(
				'There was an error while sending the email. Try again after a while!!'
			);
		}
	);
});

function sendFormData(formEl) {
	const formData = new FormData(formEl);
	const body = {};
	for (const [key, value] of formData.entries()) {
		body[key] = value;
	}

	return fetch(formEl.action, {
		mode: 'cors',
		method: formEl.method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
}
