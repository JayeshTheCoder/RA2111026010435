// App.js
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [response, setResponse] = useState(null);

  const fetchNumbers = async (numberType) => {
    try {
      const res = await axios.get(`http://localhost:9876/numbers/${numberType}`);
      setResponse(res.data);
    } catch (error) {
      console.error('Error fetching numbers:', error.message);
    }
  };

  return (
    <div className="App">
      <h1>Average Calculator Microservice</h1>
      <button className='bt1' onClick={() => fetchNumbers('e')}>Fetch Even Numbers</button><br></br>
      <button className='bt2' onClick={() => fetchNumbers('p')}>Fetch Prime Numbers</button><br></br>
      <button className='bt3' onClick={() => fetchNumbers('fibo')}>Fetch Fibonacci Numbers</button><br></br>
      <button className='bt4' onClick={() => fetchNumbers('rand')}>Fetch Random Numbers</button><br></br>
      {response && (
        <div>
          <h2>Previous Window State: {response.windowPrevState.join(', ')}</h2>
          <h2>Current Window State: {response.windowCurrState.join(', ')}</h2>
          <h2>Numbers Fetched: {response.numbers.join(', ')}</h2>
          <h2>Average: {response.avg}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
