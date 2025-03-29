import React from "react";

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

const Course = ({ course }) => {
  return (
    <div key={course.id}>
      <Header show_title={course.name} />
      <Content course={course} />
      <Total course={course} />
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

const Content = ({course:{ parts }}) => {

  return (
    <>
      <Part parts={parts} />
    </>
  );
};

const Part = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <React.Fragment key={part.id}>
          <p>note.name note.exercise</p>
        </React.Fragment>
      ))}
    </>
  );
};

const Total = ({ course: { parts } }) => {
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
