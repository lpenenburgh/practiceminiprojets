// variables 
const container = document.querySelector(".container");
// all the seats in the rows that are not occupied
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

// to change the movieSelect.value type from a string to a number, use +. (Could also wrap in parseInt)
let ticketPrice = +movieSelect.value;

//console.log(typeof ticketPrice);

//save selected movie index and price (value)
function setMovieData(movieIndex,moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

//update total count in <p>
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    
    //copy selected seats into an array from nodeList
     //map through array
    //return a new array of indexes
    // const seatsIndex = [...selectedSeats].map(function(seat) {
    //     return [...seats].indexOf(seat)
    // });

    //can shorten since there is only one expression returned
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    //console.log(seatsIndex);

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
   
    // get the # of seats selected
   const selectedSeatsCount = selectedSeats.length;

   count.innerText = selectedSeatsCount;
   total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from local storage & populate UI
// must use parse for populating since we used stringify to setItem to local Storage
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")
    );

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}


// movie select event listener
//change (instead of click) is used for dropdown
movieSelect.addEventListener("change", e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// seat click event listener- adding it to the container instead of each seat 
container.addEventListener("click", (e) => {
    //conditional to target available seats only
    if(e.target.classList.contains("seat") && 
    !e.target.classList.contains("occupied")) {
        //Toggle between adding and removing selected(blue color) class name 
        e.target.classList.toggle("selected");

        updateSelectedCount();
    }
});

//initial count and total set
updateSelectedCount();