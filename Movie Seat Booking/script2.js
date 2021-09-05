const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const movie = document.getElementById("movie");
const movieOptions = movie.querySelectorAll("option");
const count = document.getElementById("count");
const total = document.getElementById("total");

var ticketCost = +movie.value;

(function () {
    // add cost in each option in dropdown menu of movies
    movieOptions.forEach(option => {
        option.innerText += " (₹" + option.value + ")";
    });
    populateUI();
    updateCost();
})();

function populateUI() {
    const selectedSeats = JSON.parse(sessionStorage.getItem("selectedSeats"));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = sessionStorage.getItem("selectedMovieIndex");
    const selectedMoviePrice = sessionStorage.getItem("selectedMoviePrice");
    if(selectedMovieIndex !== null) {
        movie.selectedIndex = selectedMovieIndex;
        ticketCost = selectedMoviePrice;
    }
}

function setMovieData(index, price) {
    sessionStorage.setItem("selectedMovieIndex", index);
    sessionStorage.setItem("selectedMoviePrice", price);
}

function updateCost() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const numberOfSeatsSelected = selectedSeats.length;

    // store seat index in session storage
    const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    sessionStorage.setItem("selectedSeats", JSON.stringify(seatIndex));

    count.innerText = numberOfSeatsSelected;
    total.innerText = numberOfSeatsSelected * ticketCost;
}

container.addEventListener("click", e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle("selected");
        updateCost();
    }
});

movie.addEventListener("change", e => {
    ticketCost = e.target.value;

    setMovieData(e.target.selectedIndex, ticketCost);
    updateCost();
});