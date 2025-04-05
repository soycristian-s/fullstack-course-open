import React from "react";

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <div key={course.id}>
          <Header show_title={course.name} />
          <Content course={course} />
          <Total course={course} />
        </div>
      ))}
    </>
  );
};

const Header = ({ show_title }) => {
  return (
    <>
      <h2>{show_title} </h2>
    </>
  );
};

const Content = ({ course: { parts } }) => {
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
          <p>
            {part.name} {part.exercises}
          </p>
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
      <strong>
        <p>Number of exercises {total}</p>
      </strong>
    </>
  );
};

export default Course;
