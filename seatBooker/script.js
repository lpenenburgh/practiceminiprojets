// variables 
const container = document.querySelector(".container");
// all the seats in the rows that are not occupied
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

// to change the movieSelect.value type from a string to a number, use +. (Could also wrap in parseInt)
const ticketPrice = +movieSelect.value;

console.log(typeof ticketPrice);