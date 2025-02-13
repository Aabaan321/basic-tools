package com.example.toolkit;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CurrencyConverterController {

    @GetMapping("/convertCurrency")
    public String convertCurrency(
            @RequestParam double amount,
            @RequestParam String fromCurrency,
            @RequestParam String toCurrency) {
        
        double result = convert(amount, fromCurrency, toCurrency);
        return String.format("Converted amount: %.2f %s", result, toCurrency);
    }

    private double convert(double amount, String fromCurrency, String toCurrency) {
        // A simple example conversion, you can expand it later.
        if (fromCurrency.equals("USD") && toCurrency.equals("EUR")) {
            return amount * 0.85; // Example exchange rate
        } else if (fromCurrency.equals("EUR") && toCurrency.equals("USD")) {
            return amount * 1.18; // Example exchange rate
        } else {
            return amount; // No conversion available
        }
    }
}
