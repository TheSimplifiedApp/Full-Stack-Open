import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  // const anecdotes = useSelector(state => state.anecdotes)

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') return anecdotes
    return anecdotes.filter(n => n.content.includes(filter))
  })

  const sorted = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const dispatch = useDispatch()

  const vote = (id) => {
    const anecdote = anecdotes.find(n => n.id === id)
    dispatch(voteAnecdote(anecdote)) 
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {
        sorted.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList