import React from 'react';

const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) => {
  return (
    <>
      <ul>
        {parts.map((part) => (
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        ))}
      </ul>
    </>
  );
};

const Total = ({ parts }) => {
  const soma = parts.reduce((sum, { exercises }) => sum + exercises, 0);
  return (
    <>
      <p>a soma é {soma} </p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;