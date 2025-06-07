import { useState } from "react";
import "./App.css";

function App() {
  let [counter, setCounter] = useState(15);

  const addValue = () => {
    if (counter < 20) {
      setCounter(counter + 1);
      console.log("Increase Value Clicked", counter);
    }
  };

  const subValue = () => {
    if (counter > 0) {
      setCounter(counter - 1);
      console.log("Decrease Value Clicked", counter);
    }
  };

  return (
    <div className="counter-container">
      <h1>Counter Project</h1>
      
      <div className="value-display">{counter}</div>
      
      <h3>Current Value: {counter}/20</h3>
      
      <div className="buttons-container">
        <button 
          className="decrease-btn" 
          onClick={subValue}
          disabled={counter <= 0}
        >
          Decrease
        </button>
        
        <button 
          className="increase-btn" 
          onClick={addValue}
          disabled={counter >= 20}
        >
          Increase
        </button>
      </div>
    </div>
  );
}

export default App;