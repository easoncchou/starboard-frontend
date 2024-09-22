import { useState, useEffect } from 'react'

export default function Weather() {
    const [locationInput, setLocationInput] = useState("")

    const [location, setLocation] = useState("Toronto")

    const [coordinateDataLength, setCoordinateDataLength] = useState(1)

    const [locationIndex, setLocationIndex] = useState(0)

    const [weather, setWeather] = useState("")

    useEffect(() => {
        const fetchWeatherData = async () => {
            const coordinateResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=582e92759378a0b3ea0201210b74a023`)
            const coordinateData = await coordinateResponse.json()
            setCoordinateDataLength(coordinateData.length)
            console.log(coordinateData)
            // console.log(`${coordinateData[0].lat}, ${coordinateData[0].lon}`)
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinateData[locationIndex].lat}&lon=${coordinateData[locationIndex].lon}&appid=582e92759378a0b3ea0201210b74a023&units=metric`)
            let weatherData = await weatherResponse.json()
            // console.log(weatherData)
            weatherData = {
                            weather: weatherData.weather[0].main, 
                            detailedWeather: weatherData.weather[0].description, 
                            location: `${weatherData.name}, ${coordinateData[locationIndex].country}`,
                            temp: weatherData.main.temp,
                            tempFeelsLike: weatherData.main.feels_like
                          }
            // console.log(weatherData)
            setWeather(weatherData)
            return weatherData
        }
        fetchWeatherData()
    }, [location, locationIndex])

    function handleChange(event) {
        setLocationInput(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (locationInput.length > 0) {
            setLocation(locationInput)
        }
        // console.log(location)
    }

    function handleClick() {
        setLocationIndex(prevLocationIndex => {
            const ceiling = coordinateDataLength > 0 ? coordinateDataLength : 1
            return (prevLocationIndex + 1) % ceiling
        })
        console.log(locationIndex)
    }

    let suggestion = <p>&nbsp;</p>
    if (weather?.weather == 'Rain' || weather?.weather == 'Drizzle') {
        suggestion = <p>It's <b>raining!</b> &#127783; Grab an umbrella!</p>
    } else if (weather?.weather == 'Thunderstorm!') {
        suggestion = <p>There's a <b>thunderstorm!</b> &#127785; Grab an umbrella and don't hold a lightning rod.</p>
    } else if (weather?.weather == 'Snow') {
        suggestion = <p>It's <b>snowing!</b> &#10052; Put on some boots.</p>
    }

    return (
        <div className="container weatherContainer">
            <header>
                <h1>&nbsp;Weather&#127752;</h1>
                <h6>&nbsp;&nbsp;what's it like outside?</h6>
            </header>
            <main>
                <form onSubmit={handleSubmit}>
                    <fieldset role="group">
                        <input name="locationInput" type="text" placeholder="Enter a location" value={locationInput} onChange={handleChange}/>
                        <input type="submit" value="Confirm" />
                        <button onClick={handleClick}>Next</button>
                    </fieldset>
                </form>
                <div className="container weatherDisplay">
                    <p>It's currently <b>{weather?.temp}&deg;C</b> in <b>{weather?.location}.</b></p>
                    <p>Weather: <b>{weather?.weather}</b> &nbsp;&#124;&nbsp; Feels like: {weather?.tempFeelsLike}&deg;C</p>
                    {suggestion}
                </div>
            </main>
        </div>
    )
}