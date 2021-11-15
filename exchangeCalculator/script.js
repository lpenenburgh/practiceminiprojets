//https://www.exchangerate-api.com/

// variables
const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');



// Fetch exchange rate and update DOM

//grab the country selected
function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    // fetch object of first currency country from API. 
    fetch(`https://v6.exchangerate-api.com/v6/b0d07bb42861e05c29336a18/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            // the data object of currency one includes exchange rates for all other countries, so to get the rate conversion, we select the second currency two value from the data object
            const rate = data.conversion_rates[currency_two];

            //console.log(rate);
            // displays for ex. '1 USD = 0.8609 EUR' in the rate div. One is used as a standard
            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

            // we want the calculated result of the rate to appear where amount element 2 is. Use toFixed because we only want 2 decimal palces 
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        });
}



//Event listeners
// has a 'change' event because the element is a select list
currencyEl_one.addEventListener('change', calculate);
// input event as user can enter # or use arrows to change #
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    //temporary variable to store the value of currency one
    const temp = currencyEl_one.value;
    //swapping the values
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
})



calculate();