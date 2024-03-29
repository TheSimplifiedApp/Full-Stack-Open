import { connect } from "react-redux";
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = { createAnecdote }

export default connect(null, mapDispatchToProps)(AnecdoteForm)



// import { useDispatch } from 'react-redux'
// import { createAnecdote } from '../reducers/anecdoteReducer'

// const AnecdoteForm = () => {
//   const dispatch = useDispatch()

//   const create = async (event) => {
//     event.preventDefault()
//     const content = event.target.anecdote.value
//     event.target.anecdote.value = ''
//     dispatch(createAnecdote(content))
//   }

//   return (
//     <div>
//       <h2>create new</h2>
//       <form onSubmit={create}>
//         <div><input name='anecdote' /></div>
//         <button type='submit'>create</button>
//       </form>
//     </div>
//   )
// }

// export default AnecdoteForm