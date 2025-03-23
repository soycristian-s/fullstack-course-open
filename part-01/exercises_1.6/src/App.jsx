import { useState } from "react";

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleAverage = () => {
  }

  const totalComents = good+neutral+bad
  const averageComents = (good-bad)/totalComents
  const positiveComents = good/totalComents*100

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {totalComents}</p>
      <p>Average score{averageComents}</p>
      <p>Positive score{positiveComents} %</p>
    </div>
  );
};

export default App;
