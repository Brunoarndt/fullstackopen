const Header = ({ course }) => <h1>{course}</h1>

const Content = ({parts}) => {
  return (
    <>
      <ul>
        {parts.map(parts => 
          <li key={parts.id}>
            {parts.name} {parts.exercises}
          </li>
        )}
      </ul>
    </>
  );
}

const Total = ({sum}) => {
  const soma = sum.reduce( ( sum, { exercises } ) => sum + exercises , 0)
  return (
    <>
      <p>a soma é {soma} </p>
    </>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts} />
    </div>
  )
  
}

export default App