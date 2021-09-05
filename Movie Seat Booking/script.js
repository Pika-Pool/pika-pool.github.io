const movie = document.getElementById("movie");
const seats = document.querySelectorAll(".container .seat:not(.occupied)");
const movieOptions = movie.querySelectorAll("option");
const count = document.getElementById("count");
const total = document.getElementById("total");

var perSeatCost = +movie.value;     // the + sign converts the value, which is a string, to a number

(function init() {
    const seatIndex = sessionStorage.getItem("seatIndex");
    if (seatIndex !== null && seatIndex.length > 0) {
        seats.forEach((seat, index) => {
            if (seatIndex.indexOf(index) !== -1) {
                seat.classList.add("selected");
            }
        });
    }

    movie.selectedIndex = sessionStorage.getItem("selectedMovieIndex");
    perSeatCost = +movie.value;

    setCost();
})();

// calculate and set the cost and total in HTML
function setCost() {
    const selectedSeatList = document.querySelectorAll(".row .seat.selected");

    // store selected seat index in session storage
    const seatIndex = [...selectedSeatList].map(seat => [...seats].indexOf(seat));
    sessionStorage.setItem("seatIndex", JSON.stringify(seatIndex));

    const numberOfSeatsSelected = selectedSeatList.length;
    count.innerText = numberOfSeatsSelected;
    total.innerText = numberOfSeatsSelected * perSeatCost;
}

// store info about the movie selected
function storeMovie(selectedMovieIndex) {
    sessionStorage.setItem("selectedMovieIndex", selectedMovieIndex);
}

// add cost in each option in dropdown menu of movies
movieOptions.forEach(option => {
    option.innerText += " (₹" + option.value + ")";
});

// EVENT LISTENERS
seats.forEach(seat => {
    seat.addEventListener("click", () => {
        seat.classList.toggle("selected");
        setCost();
    });
});

movie.addEventListener("change", () => {
    perSeatCost = movie.value;

    storeMovie(movie.selectedIndex);
    setCost();
});