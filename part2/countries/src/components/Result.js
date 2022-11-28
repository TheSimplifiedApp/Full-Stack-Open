import Country from "./Country"

const Result = ({countries, setCountries}) => {
    if (countries.length > 10 ) {
      return <div>Too many matches, specify another filter</div>
    } else if (countries.length >= 2) {
      return (
        <div>
          {countries.map(country => <div key={country.name.common}>{country.name.common} <button onClick={() => setCountries([country])}>show</button></div>)}
        </div>
      )
    } else if (countries.length === 1) {
      return <Country country={countries[0]} />
    }
}

export default Result