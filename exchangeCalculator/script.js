//https://www.exchangerate-api.com/

// variables
const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');



// Fetch exchange rate and update DOM
function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    fetch(`https://v6.exchangerate-api.com/v6/b0d07bb42861e05c29336a18/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            //console.log(data);
        });
}



//Event listeners
// has a 'change' event because the element is a select list
currencyEl_one.addEventListener('change', calculate);
// input event as user can enter # or use arrows to change #
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);



calculate();