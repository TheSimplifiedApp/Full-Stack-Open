import { useState, useEffect } from 'react'
import axios from 'axios'
import Result from './components/Result'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [result, setResult] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setAllCountries(response.data)
    })
  }, [])

  const searchCountries = (event) => {
    if (event.target.value !== "") {
      const searchResult = allCountries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
      setResult(searchResult)
    }
  }



  return (
    <div>
      find countries <input onChange={searchCountries} />
      <Result countries={result} setCountries={setResult} />
    </div>
  )
}

export default App