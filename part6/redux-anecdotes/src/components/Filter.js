import { connect } from "react-redux";
import { createFilter } from "../reducers/filterReducer"

const Filter = (props) => {
  const handleChange = (event) => {
    props.createFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = { createFilter }

export default connect(null, mapDispatchToProps)(Filter)

// import { useDispatch } from "react-redux"
// import { createFilter } from "../reducers/filterReducer"


// const Filter = () => {
//   const dispatch = useDispatch()

//   const handleChange = (event) => {
//     dispatch(createFilter(event.target.value)) 
//   }

//   const style = {
//     marginBottom: 10
//   }

//   return (
//     <div style={style}>
//       filter <input onChange={handleChange} />
//     </div>
//   )
// }

// export default Filter