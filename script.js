function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("currencyFrom").value;
    const toCurrency = document.getElementById("currencyTo").value;

    const conversionRates = {
        USD: {
            EUR: 0.85,
            INR: 74.59,
        },
        EUR: {
            USD: 1.18,
            INR: 87.81,
        },
        INR: {
            USD: 0.013,
            EUR: 0.011,
        }
    };

    // Check if the same currency is selected for both from and to
    if (fromCurrency === toCurrency) {
        document.getElementById("currencyResult").innerText = `Amount: ${amount} ${fromCurrency}`;
        return;
    }

    // Perform the conversion
    const convertedAmount = (amount * conversionRates[fromCurrency][toCurrency]).toFixed(2);

    // Display the result
    document.getElementById("currencyResult").innerText = `Converted amount: ${convertedAmount} ${toCurrency}`;
}
