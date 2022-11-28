import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import phonebookServices from './services/phonebook'

const App = () => {
  const [allPerson, setAllPerson] = useState([])
  const [filteredPerson, setFilteredPerson] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')


  const getAllPerson = () => {
    phonebookServices
    .getAll()
    .then(allPerson => {
      setAllPerson(allPerson)
      setFilteredPerson(allPerson)
    })
    .catch(error => {
      alert("Unable to get data from server.", error)
    })
  }


  useEffect(() => {
    getAllPerson()
  }, [])

  const handleNewNameChange = (event) => setNewName(event.target.value)
  const handleNewNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchNameChange = (event) => {
    const searchString = event.target.value
    if (searchString === "") {
      setFilteredPerson(allPerson)
      return
    }
    const result = allPerson.filter(person => person.name.toLowerCase().includes(searchString.toLowerCase()))
    setFilteredPerson(result)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === "" ) {
      alert("Name field can't be empty.")
      return
    } else if ( newNumber === "" ) {
      alert("Number field can't be empty.")
      return
    }
    
    const nameExist = allPerson.some(person => person.name === newName)
    if (nameExist) {
      if (window.confirm(`${newName} is alrady added to phonebook, replace the old number with a new one?`)) {
        const selectedPerson = allPerson.filter(person => person.name === newName)
        const editedPerson = {...selectedPerson[0], number: newNumber}
        phonebookServices
          .updatePerson(selectedPerson[0].id, editedPerson)
          .then(returnedData => {
            getAllPerson()
            setNewName("")
            setNewNumber("")
          })
          .catch(error => {
            setNotificationMessage(`Information for ${newName} has already been removed from server`)
            setNotificationType('error')
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
      }
      return
    } 
    const newPerson = {
      name: newName,
      number: newNumber
    }
    phonebookServices
    .addPerson(newPerson)
    .then(returnedData => {
      setFilteredPerson(allPerson.concat(returnedData))
      setAllPerson(allPerson.concat(returnedData))
      setNewName("")
      setNewNumber("")
      setNotificationMessage(`Added ${returnedData.name}`)
      setNotificationType('success')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    })
    .catch(error => {
      alert("Fail to add new person to server.", error)
    })
  }

  const deletePerson = (id) => {
    const selectedPerson = allPerson.filter(person => person.id === id)
    if (window.confirm(`Are you sure to delete ${selectedPerson[0].name}`)) {
      phonebookServices
        .deletePerson(id)
        .then(() => {
          setFilteredPerson(allPerson.filter(person => person.id !== id))
          setAllPerson(allPerson.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(`Unable to delete ${selectedPerson[0].name}`, error)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter handleChange={handleSearchNameChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNewNameChange={handleNewNameChange} newNumber={newNumber} handleNewNumberChange={handleNewNumberChange} />
      <h2>Numbers</h2>
      <Persons results={filteredPerson} deletePerson={deletePerson} />
    </div>
  )
}

export default App