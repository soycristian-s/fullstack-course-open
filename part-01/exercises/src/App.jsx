const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    // <div>
    //   <h1>{course}</h1>
    //   <p>
    //     {part1} {exercises1}
    //   </p>
    //   <p>
    //     {part2} {exercises2}
    //   </p>
    //   <p>
    //     {part3} {exercises3}
    //   </p>
    //   <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    // </div>}
    <div>
      <Header show_title={course} />
      <Content prop={{partes:[part1, part2, part3], ejercicios:[exercises1, exercises2, exercises3]}}/>
      <Total ejercicios={[exercises1, exercises2, exercises3]} />
    </div>
  );
};

const Header = ({show_title}) => {
  return (
  <>
    <h1>{show_title} </h1>
  </>
)};


const Content = ({ prop: { partes, ejercicios } }) => {
  let [part1, part2, part3] = partes
  let [exercises1, exercises2, exercises3] = ejercicios

  return (
    <>
    <p>
      {part1} {exercises1}
    </p>
    <p>
      {part2} {exercises2}
    </p>
    <p>
      {part3} {exercises3}
    </p> 
    </>
)
}

const Total = ({ejercicios}) => {
  let total = ejercicios.reduce((acc, current)=>{ 
    return acc + current
  },0)
  
  return (
    <>
    <p>Number of exercises {total}</p>
    </>
  )
}
export default App;
