const Persons = ({personsToShow, deletePerson }) => 
    personsToShow.map(person => <div key={person.id}>
        {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button>
    </div>)

export default Persons