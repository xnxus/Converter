import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CurrencyConverter() {
  const [usdRate, setUsdRate] = useState(null);
  const [eurRate, setEurRate] = useState(null);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const apiKey = 'fca_live_Ne4IaQOtx3sBV1rRW1bgCiUwQS5p7j4wPWelvI5j';

    axios.get(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=EUR%2CUSD%2CCAD`)
      .then(response => {
        const data = response.data;
        setUsdRate(data.rates.USD);
        setEurRate(data.rates.EUR);
      })
      .catch(error => {
        console.error('Помилка при отриманні курсів валют:', error);
      });
  }, []);

  useEffect(() => {
    let convertedAmount = amount;

    if (fromCurrency === 'UAH' && toCurrency === 'USD') {
      convertedAmount = amount / usdRate;
    } else if (fromCurrency === 'UAH' && toCurrency === 'EUR') {
      convertedAmount = amount / eurRate;
    } else if (fromCurrency === 'USD' && toCurrency === 'UAH') {
      convertedAmount = amount * usdRate;
    } else if (fromCurrency === 'EUR' && toCurrency === 'UAH') {
      convertedAmount = amount * eurRate;
    }

    setResult(convertedAmount);
  }, [amount, fromCurrency, toCurrency, usdRate, eurRate]);

  return (
    <div className="currency-converter">
      <div className="currency_input">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      <div className="currency_input">
        <input
          type="number"
          value={result !== null ? result : '...'}
          disabled
        />
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      <div id="result">
        1 {fromCurrency} = {result !== null ? result : '...'} {toCurrency}
      </div>
    </div>
  );
}

export default CurrencyConverter;
