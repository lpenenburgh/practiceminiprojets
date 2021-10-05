// variables 
const container = document.querySelector(".container");
// all the seats in the rows that are not occupied
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

// to change the movieSelect.value type from a string to a number, use +. (Could also wrap in parseInt)
let ticketPrice = +movieSelect.value;

//console.log(typeof ticketPrice);

//update total count in <p>
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    
    //copy selected seats into an array from nodeList
     //map through array
    //return a new array of indexes
    const seatsIndex = [...selectedSeats].map(function(seat) {
        return [...seats].indexOf(seat)
    });

    console.log(seatsIndex);
   
    // get the # of seats selected
   const selectedSeatsCount = selectedSeats.length;

   count.innerText = selectedSeatsCount;
   total.innerText = selectedSeatsCount * ticketPrice;
}

// movie select event listener
//change (instead of click) is used for dropdown
movieSelect.addEventListener("change", e => {
    ticketPrice = +e.target.value
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