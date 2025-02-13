function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("currencyFrom").value;
    const toCurrency = document.getElementById("currencyTo").value;

    // Use the deployed API URL here
    fetch(`https://your-app.herokuapp.com/convertCurrency?amount=${amount}&fromCurrency=${fromCurrency}&toCurrency=${toCurrency}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById("currencyResult").innerText = data;
        })
        .catch(err => {
            document.getElementById("currencyResult").innerText = "Error fetching conversion.";
        });
}
