const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const swap = document.getElementById("swap");
const rateEl = document.getElementById("rate");

// Fetch exchange rates and update DOM
function caculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  fetch(`https://api.exchangeratesapi.io/latest?base=${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      const amount_one = amountEl_one.value;
      amountEl_two.value = (amount_one * rate).toFixed(2);
    });
}

// Event listeners
currencyEl_one.addEventListener("change", caculate);
amountEl_one.addEventListener("input", caculate);
currencyEl_two.addEventListener("change", caculate);
amountEl_two.addEventListener("input", caculate);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  caculate();
});

// Initial caculation
caculate();
