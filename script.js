const menu = document.getElementById('menu');
const hamburger = document.getElementById('hamburger');
const contactForm = document.getElementById('contact-form');
const contactFormSubmitBtn = document.getElementById('contact-form-submit-btn');
const contactFormInputElements =
	contactForm.querySelectorAll('input, textarea');

hamburger.addEventListener('click', () => {
	menu.classList.toggle('show');
	console.log('hello');
});

let isFormSubmitLoading = false;
contactForm.addEventListener('submit', e => {
	e.preventDefault();
	if (isFormSubmitLoading) return;

	const formEl = contactForm;
	setSubmitLoadingState(true);

	sendFormData(formEl)
		.then(
			res => {
				if (!res.ok) {
					alert(
						'There was an error while sending the message. Try again after a while!!'
					);
					res.json().then(console.error);
					return;
				}

				alert('Email sent');
				clearContactFormInputs();
			},
			e => {
				console.error(e);
				alert(
					'There was an error while sending the message. Try again after a while!!'
				);
			}
		)
		.finally(() => {
			setSubmitLoadingState(false);
		});
});

function sendFormData(formEl) {
	const formData = new FormData(formEl);
	const body = {};
	for (const [key, value] of formData.entries()) {
		body[key] = value;
	}

	console.log(JSON.stringify(body));

	return fetch(formEl.action, {
		mode: 'cors',
		method: formEl.method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
}

/**
 * @param {boolean} state
 */
function setSubmitLoadingState(state) {
	isFormSubmitLoading = state;

	if (state === true) {
		contactFormSubmitBtn.classList.add('loading');
		contactFormSubmitBtn.textContent = 'Loading...';
	} else {
		contactFormSubmitBtn.classList.remove('loading');
		contactFormSubmitBtn.textContent = 'Submit';
	}
}

function clearContactFormInputs() {
	contactFormInputElements.forEach(el => (el.value = ''));
}
