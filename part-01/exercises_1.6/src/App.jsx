import { useState } from "react";

const Statistics = ({ comments: { good, neutral, bad } }) => {
  const totalComents = good + neutral + bad;
  const averageComents = (good - bad) / totalComents || 0;
  const positiveComents = (good / totalComents) * 100 || 0 + " %";

  if (totalComents !== 0) {
    return (
      <>
        <StatisticLine text={"Good"} value={good}></StatisticLine>
        <StatisticLine text={"Neutral"} value={neutral}></StatisticLine>
        <StatisticLine text={"Bad"} value={bad}></StatisticLine>
        <StatisticLine text={"All"} value={totalComents}></StatisticLine>
        <StatisticLine
          text={"Average score"}
          value={averageComents}
        ></StatisticLine>
        <StatisticLine
          text={"Positive score"}
          value={positiveComents}
        ></StatisticLine>
      </>
    );
  } else {
    return <p>No feedback given</p>;
  }
};

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Button = ({ handler, text }) => {
  return <button onClick={handler}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handler={() => setGood(good + 1)} text={"good"}></Button>
      <Button handler={() => setNeutral(neutral + 1)} text={"neutral"}></Button>
      <Button handler={() => setBad(bad + 1)} text={"bad"}></Button>
      <h1>Stadistics</h1>
      <Statistics comments={{ good, neutral, bad }}></Statistics>
    </div>
  );
};

export default App;
