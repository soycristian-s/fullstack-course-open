const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header show_title={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

const Header = ({ show_title }) => {
  return (
    <>
      <h1>{show_title} </h1>
    </>
  );
};

const Content = ({ parts: [part1, part2, part3] }) => {
  const { exercises: exercises1, name: parte1 } = part1;
  const { exercises: exercises2, name: parte2 } = part2;
  const { exercises: exercises3, name: parte3 } = part3;

  return (
    <>
      <Part part={parte1} exercise={exercises1} />
      <Part part={parte2} exercise={exercises2} />
      <Part part={parte3} exercise={exercises3} />
    </>
  );
};

const Part = ({ part, exercise }) => {
  return (
    <>
      <p>
        {part} {exercise}{" "}
      </p>
    </>
  );
};

const Total = ({ parts }) => {
  let total = parts.reduce((acc, current) => {
    return acc + current.exercises;
  }, 0);

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};
export default App;
