// server.js

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 9876;

const WINDOW_SIZE = 10;
let storedNumbers = [];

const fetchNumbers = async (numberType) => {
  try {
    const response = await axios.get(`http://20.244.56.144/test/${numberType}`);
    return response.data.numbers;
  } catch (error) {
    console.error('Error fetching numbers:', error.message);
    return [];
  }
};

const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
};

// Function to register the company and obtain credentials
const registerCompanyAndGetAuthToken = async () => {
  try {
    const registerResponse = await axios.post('http://20.244.56.144/test/register', {
      companyName: "Grabit",
      ownerName: "Tanush",
      rollNo: "RA2111026010443",
      ownerEmail: "TC5815@srmist.edu",
      accessCode: "kJtfKH"
    });
    const { clientID, clientSecret } = registerResponse.data;
    
    const authResponse = await axios.post('http://20.244.56.144/test/auth', {
      companyName: "grabit",
      clientID: "341a137d-7552-449d-8202-b5976f39a6cf",
      clientSecret: "HjbllHCRjYtlplyo",
      ownerName: "Tanush",
      ownerEmail: "tc5815@srmist.edu",
      rollNo: "RA2111026010443"
    });
    const { access_token } = authResponse.data;
    
    return access_token;
  } catch (error) {
    console.error('Error registering company or obtaining auth token:', error.message);
    throw error;
  }
};

app.get('/numbers/:numberid', async (req, res) => {
  try {
    // Register company and obtain authorization token
    const authToken = await registerCompanyAndGetAuthToken();
    
    const { numberid } = req.params;
    const numbers = await fetchNumbers(numberid);
    if (!numbers) {
      return res.status(500).json({ error: 'Failed to fetch numbers' });
    }
  
    const windowPrevState = storedNumbers.slice(-WINDOW_SIZE);
    storedNumbers = [...storedNumbers, ...numbers].slice(-WINDOW_SIZE);
    const windowCurrState = storedNumbers.slice(-WINDOW_SIZE);
  
    const avg = calculateAverage(windowCurrState);
  
    const response = {
      windowPrevState,
      windowCurrState,
      numbers,
      avg
    };
  
    res.json(response);
  } catch (error) {
    console.error('An error occurred while processing request:', error.message);
    res.status(500).json({ error: 'An error occurred while processing request' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
