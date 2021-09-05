const searchForm = document.querySelector('.searchForm');
const searchInput = document.querySelector('.input');
const searchBtn = document.querySelector('.searchBtn');
const randomSearchBtn = document.querySelector('.randomSearchBtn');
const mealsDisplay = document.querySelector('.meals');
const searchResultDisplay = document.querySelector('.searchResult');
const singleMealDisplay = document.querySelector('.singleMeal');

const SEARCH_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const RANDOM_API = 'https://www.themealdb.com/api/json/v1/1/random.php';

let mealsList;
let searchValue;

// fetch data from api
function fetchData(APILink) {
	fetch(APILink)
		.then(response => response.json())
		.then(data => {
			mealsList = data.meals;
			handleFetchedData(APILink === RANDOM_API);
		});
}

// check what to do with the fetched data
function handleFetchedData(isRandom = false) {
	searchValue = searchInput.value;

	mealsDisplay.innerHTML = '';
	singleMealDisplay.innerHTML = '';
	searchInput.value = '';
	searchResultDisplayFunction();

	if (!mealsList) {
		searchResultDisplayFunction(`No results found for '${searchValue}'`);
	} else if (
		mealsList.length === 1 &&
		(mealsList[0].strMeal.toLowerCase() === searchValue.toLowerCase() ||
			!searchValue)
	) {
		addSingleMealToDOM(mealsList[0], isRandom);
	} else {
		addMealsToDOM(mealsList);
	}
}

// format meal instructions into li's
function formatRecipeInstructions(mealInstructions) {
	let steps = mealInstructions.split(/(\. )/);
	let instructions = '';
	for (let i = 0; i < steps.length; ++i) {
		if (i % 2 === 0 && i === steps.length - 1) {
			let p = `<li>${steps[i]}</li>`;
			instructions += p;
		} else if (i % 2 === 1) {
			let p = `<li>${steps[i - 1] + steps[i]}</li>`;
			instructions += p;
		}
	}
	return instructions;
}

// format ingrdients into li's
function formatIngredients(meal) {
	let ingredientsList = '';
	let i = 1;
	let ingredient = 'strIngredient';
	let measure = 'strMeasure';

	for (let i = 1; meal[ingredient + i]; ++i) {
		let li = `<li class="ingredient">${meal[ingredient + i]} - ${
			meal[measure + i]
		} </li>`;
		ingredientsList += li;
	}

	return ingredientsList;
}

// create and add single meal to DOM
function addSingleMealToDOM(meal, isRandom = false) {
	mealsDisplay.innerHTML = '';
	singleMealDisplay.innerHTML = '';
	searchInput.value = '';
	searchResultDisplayFunction('');

	let instructions = formatRecipeInstructions(meal.strInstructions);
	let ingredientsList = formatIngredients(meal);
	singleMeal = !isRandom
		? `<button class="backBtn"><i class="fas fa-arrow-left"></i></button>`
		: ``;

	singleMeal += `
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}">

        <div class="singleMealInfo">
            <p class="category">${meal.strCategory}</p>
            <p class="country">${meal.strArea}</p>
        </div>
        
        <main class="recipe">
            <ul class="instructions">
                ${instructions}
            </ul>
            <h2>Ingredients</h2>
            <ul class="ingredients">
                ${ingredientsList}
            </ul>
        </main>
    `;

	singleMealDisplay.innerHTML = singleMeal;
}

// create .meal divs and display fetched meals in mealsDisplay
function addMealsToDOM() {
	mealsDisplay.innerHTML = '';
	singleMealDisplay.innerHTML = '';
	searchInput.value = '';

	searchValue
		? searchResultDisplayFunction(`Search results for '${searchValue}'`)
		: searchResultDisplayFunction(``);

	let mealsElement = '';
	mealsList.forEach(meal => {
		let el = `
            <div class="meal" data-idmeal="${meal.idMeal}" data-strmeal="${meal.strMeal}">
                <img src="${meal.strMealThumb}">
                <div class="meal-info">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
        `;
		mealsElement += el;
	});
	mealsDisplay.innerHTML = mealsElement;
}

// result notification
function searchResultDisplayFunction(string = '') {
	searchResultDisplay.textContent = string;
}

// search click handler
function search(event) {
	if (
		event.target.classList.contains('searchBtn') ||
		event.target.classList.contains('fa-search')
	) {
		let APILink = SEARCH_API + searchInput.value;
		fetchData(APILink);
	} else if (
		event.target.classList.contains('randomSearchBtn') ||
		event.target.classList.contains('fa-random')
	) {
		fetchData(RANDOM_API);
	}
}

function hasSomeParentTheClass(element, classname) {
	if (element.classList.contains(classname)) {
		return element;
	} else if (element.parentNode) {
		return hasSomeParentTheClass(element.parentNode, classname);
	}
	return null;
}

// open a single meal from meal list
function mealsClickHandler(event) {
	let mealElement = hasSomeParentTheClass(event.target, 'meal');
	if (mealElement) {
		let meal = mealsList.find(
			item => item.idMeal === mealElement.dataset.idmeal
		);
		meal ? addSingleMealToDOM(meal) : false;
	}
}

// go to the previous page
function previousPage(event) {
	if (
		event.target.classList.contains('fa-arrow-left') ||
		event.target.classList.contains('backBtn')
	) {
		addMealsToDOM();
	}
}

searchForm.addEventListener('submit', e => {
	e.preventDefault();
});
searchBtn.addEventListener('click', search);
randomSearchBtn.addEventListener('click', search);
mealsDisplay.addEventListener('click', mealsClickHandler);
singleMealDisplay.addEventListener('click', previousPage);
window.addEventListener('load', () => {
	fetchData(SEARCH_API);
});
