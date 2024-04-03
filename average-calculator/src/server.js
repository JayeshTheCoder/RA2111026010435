// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 9876;

let storedNumbers = [];
const WINDOW_SIZE = 30;

app.use(express.json());

app.get('/numbers/:numberid', async (req, res) => {
    const { numberid } = req.params;
    let newData = [];

    switch (numberid) {
        case 'p':
            newData = generatePrimes();
            break;
        case 'f':
            newData = generateFibonacci();
            break;
        case 'e':
            newData = generateEven();
            break;
        case 'r':
            newData = generateRandom();
            break;
        default:
            res.status(400).json({ error: "Invalid number ID" });
            return;
    }

    storedNumbers = [...storedNumbers, ...newData].slice(-WINDOW_SIZE);
    const prevNumbers = storedNumbers.slice(0, storedNumbers.length - newData.length);
    const currNumbers = storedNumbers.slice(storedNumbers.length - newData.length);
    const avg = calculateAverage(storedNumbers);

    res.json({
        windowPrevState: prevNumbers,
        windowCurrState: currNumbers,
        avg: avg.toFixed(2)
    });
});

function calculateAverage(numbers) {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
}

function generatePrimes() {
  const primes = [];
  let num = 2; 

  
  while (primes.length < WINDOW_SIZE) {
      let isPrime = true;

      
      for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) {
              isPrime = false;
              break;
          }
      }

      
      if (isPrime) {
          primes.push(num);
      }

      
      num++;
  }

  return primes;
}


function generateFibonacci() {
  const fibonacci = [0, 1];
  let i = 2;
  while (i < WINDOW_SIZE) {
      const nextFibonacci = fibonacci[i - 1] + fibonacci[i - 2];
      fibonacci.push(nextFibonacci);
      i++;
  }
  return fibonacci;
}


function generateEven() {
  const evens = [];
  let num = 2; 

  
  while (evens.length < WINDOW_SIZE) {
      evens.push(num);
      num += 2; 
  }

  return evens;
}


function generateRandom() {
  const randoms = [];
  for (let i = 0; i < WINDOW_SIZE; i++) {
      const randomNum = Math.floor(Math.random() * 100); 
      randoms.push(randomNum);
  }
  return randoms;
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
