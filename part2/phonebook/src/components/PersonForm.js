const PersonForm = ({ addPerson, newName, handleNewNameChange, newNumber, handleNewNumberChange}) => (
    <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumberChange} type="number" />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

export default PersonForm