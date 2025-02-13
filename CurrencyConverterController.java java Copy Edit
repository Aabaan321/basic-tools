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
        if (fromCurrency.equals("USD") && toCurrency.equals("EUR")) {
            return amount * 0.85;
        } else if (fromCurrency.equals("EUR") && toCurrency.equals("USD")) {
            return amount * 1.18;
        } else {
            return amount; // Default if no conversion is found
        }
    }
}
