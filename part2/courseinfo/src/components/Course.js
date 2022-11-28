const Header = ({ name }) => <h1>{ name }</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => (
    <>
        { parts.map(part => <Part key={part.id} part={part} />) }
    </>
)

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return <h4>Total of { total } exercises</h4>
}

const Course = ({ course }) => (
    <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

export default Course