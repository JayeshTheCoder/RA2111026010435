import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [averageData, setAverageData] = useState({
    windowPrevState: [],
    windowCurrState: [],
    avg: 0
  });
  const [numberId, setNumberId] = useState('');

  const handleInputChange = (event) => {
    setNumberId(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:9876/numbers/${numberId}`);
      setAverageData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Average Calculator</h1>
      <label>
        Number ID:
        <input type="text" value={numberId} onChange={handleInputChange} />
      </label>
      <button onClick={fetchData}>Calculate</button>
      <div>
        <h2>Previous State:</h2>
        <p>{averageData.windowPrevState.join(', ')}</p>
        <h2>Current State:</h2>
        <p>{averageData.windowCurrState.join(', ')}</p>
        <h2>Average:</h2>
        <p>{averageData.avg}</p>
      </div>
    </div>
  );
}

export default App;
