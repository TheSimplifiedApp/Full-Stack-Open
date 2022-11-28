import { useState, useEffect } from "react"
import axios from "axios"

const Country = ({country}) => {
    const languages = Object.values(country.languages)

    const [temp, setTemp] = useState(0)
    const [wind, setWind] = useState(0)
    const [weatherIcon, setWeatherIcon] = useState("")

    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
        .then(response => {
            setTemp(response.data.main.temp)
            setWeatherIcon(response.data.weather[0].icon)
            setWind(response.data.wind.speed)
        })
    }, [country.capital])

    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>
          capital {country.capital} 
          <br />
          area {country.area} 
        </p>
        <h3>languages:</h3>
        <ul>
          { languages.map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.svg} alt="Flag" width={150} />
        <h2>Weather in {country.capital}</h2>
        <p>temperature {temp} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="weather"/>
        <p>wind {wind} m/s</p>
      </div>
      
    )
}

export default Country