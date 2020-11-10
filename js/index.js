const myDOM = (function() {
    const elements = {
        firstCurrency: document.getElementById("currency-one"),
        secondCurrency: document.getElementById("currency-two"),

        firstAmount: document.getElementById("amount-one"),
        secondAmount: document.getElementById("amount-two"),

        rate: document.getElementById("rate"),
        swap: document.getElementById("swap")
    }
    return elements;
})();



// TODO: Fetch exchange rate and update the dom
const calculate = () => {
    // Get the value of currency elements: the select elements, which hold the regions currency name
    const currency_one = myDOM.firstCurrency.value; // value of select one; a region currency name like USD
    const currency_two = myDOM.secondCurrency.value; // value of select two


    // NOTE: Remember, fetch returns a promise
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    // if promise is successful successful, our request will give us a response object, but none of it is rendered to data we can use
    .then((response) => {
        // to render it to usable data, we take our response and add the json() to it.
        // this will return another promise, 
        return response.json();
    }).catch((err) => {
        console.log(err)
    })
    .then((data) => {
        // if THIS promise succeeds, it will return our our data in a format we can use in our app
        // console.log(data);
        const rate = data.rates[currency_two];
        console.log(rate);

        myDOM.rate.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
        myDOM.secondAmount.value = (myDOM.firstAmount.value * rate).toFixed(2);
    }).catch((err) => {
        console.log(err)
    })
}

myDOM.firstCurrency.addEventListener("change", calculate);
myDOM.firstAmount.addEventListener("input", calculate);

myDOM.secondCurrency.addEventListener("change", calculate);
myDOM.secondAmount.addEventListener("input", calculate);

myDOM.swap.addEventListener("click", () => { // Swap values and the calculate so if original was usd to euros, we find the currency exchange of euros to usd
    // Dont let this confuse you. We are simpling swapping the values
    const temp = myDOM.firstCurrency.value;
    myDOM.firstCurrency.value = myDOM.secondCurrency.value;
    myDOM.secondCurrency.value = temp;
    calculate();
})

calculate();










// When it comes to IIFE's I like ES5 syntax better than ES6