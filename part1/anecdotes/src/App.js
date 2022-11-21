import { useState } from 'react'

const Display = ({heading, anecdote, vote}) => (
  <div>
    <h1>{ heading }</h1>
    { anecdote }
    <br />
    has { vote } votes
  </div>
)

const Button = ({text, handleClick}) => <button onClick={handleClick}>{ text }</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))


  const random = () => {
    const num = Math.floor(Math.random() * anecdotes.length)
    setSelected(num)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    const max = Math.max(...copy)
    const index = copy.indexOf(max)
    setVotes(copy)
    setMostVoted(index)     
  }

  return (
    <div>
      <Display heading="Anecdote of the day" anecdote={anecdotes[selected]} vote={votes[selected]} />
      <Button text="vote" handleClick={vote} />
      <Button text="next anecdote" handleClick={random} />
      <Display heading="Anecdote with most votes" anecdote={anecdotes[mostVoted]} vote={votes[mostVoted]} />
    </div>
  )
}

export default App