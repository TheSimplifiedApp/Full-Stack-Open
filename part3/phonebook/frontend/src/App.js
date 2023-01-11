import { useState, useEffect } from 'react'
// import axios from 'axios'
import phonebookService from './services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    phonebookService
      .getAll()
      .then(persons => setPersons(persons))
      .catch(error => notify("Unable to connect to server", 'alert'))
      
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     setPersons(response.data)
    //   })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    setNewName("")
    setNewNumber("")

    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      phonebookService
        .update(existingPerson.id, {...existingPerson, number: newNumber})
        .then(returnedData => {
          setPersons(persons.map(p => p.id === existingPerson.id ? returnedData : p))
          notify(`Updated info of ${returnedData.name}`)
        })
        .catch(error => notify(error.response.data.error, 'alert'))
      return
    }

    phonebookService
      .create(newPerson)
      .then(returnedData => {
        setPersons(persons.concat(returnedData))
        notify(`Added ${returnedData.name}`)
      })
      .catch(error => notify(error.response.data.error, 'alert'))
  }

  const deletePerson = id => {
    const p = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${p.name}`)) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          notify(`Deleted ${p.name}`)
        })
        .catch(error => notify(`Unable to delete ${p.name}`, 'alert'))
    }
  }

  const personsToShow = (filter.length === 0) ? persons : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter value={filter} handleChange={(event) => {setFilter(event.target.value)}} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        name={newName}
        handleNameChange={(event) => {setNewName(event.target.value)}}
        number={newNumber}
        handleNumberChange={(event) => {setNewNumber(event.target.value)}}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App