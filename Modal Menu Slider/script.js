const navbar = document.querySelector('.navbar');
const navToggler = document.querySelector('.nav-toggle-btn');
const signupBtn = document.querySelector('.signup-btn');
const modalContainer = document.querySelector('.modal-container');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const modalForm = document.querySelector('#modal-form');

function toggleNavbar() {
	document.body.classList.toggle('show-navbar');
	document.body.classList.toggle('collapse-navbar');
}

function navbarFixedOnScroll() {
	if (document.body.classList.contains('show-navbar')) navbar.style.top = `${window.scrollY}px`;
}

function openModal() {
	modalContainer.classList.add('show-modal');
}

function closeModal() {
    modalContainer.classList.remove('show-modal');
}

function offModalClickHandler(event) {
	event.target === modalContainer ? closeModal() : false;
}

navToggler.addEventListener('click', toggleNavbar);
signupBtn.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);
modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal();
});
window.addEventListener('scroll', navbarFixedOnScroll);
window.addEventListener('click', offModalClickHandler);