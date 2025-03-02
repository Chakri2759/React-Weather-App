import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from 'react';
import { useState } from 'react';
import "./SearchBox.css"
export default function SearchBox({ updateInfo }) {
    let API_URL = "https://api.openweathermap.org/data/2.5/weather"
    let API_KEY = "38b782dbe6ed6a736d4e86d4f3526da0"
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    function handleInput(event) {
        setCity(event.target.value);
    }
    let getWeather = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonRes = await response.json();
            let result = {
                city: city,
                temp: jsonRes.main.temp,
                tempMin: jsonRes.main.temp_min,
                tempMax: jsonRes.main.temp_max,
                humidity: jsonRes.main.humidity,
                feelsLike: jsonRes.main.feels_like,
                weather: jsonRes.weather[0].description
            }
            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }
    }
    async function handleSubmit(event) {
        try {
            event.preventDefault();
            console.log(city);
            let newInfo = await getWeather();
            setCity("");
            updateInfo(newInfo);
        } catch (err) {
            setError(true);
        }
    }

    return (
        <div className='SearchBox'>
            <h2>Search for weather</h2>
            <form onSubmit={handleSubmit}>
                <div className="search">
                    <div className="search-feild">
                        <TextField 
                            id="city" 
                            label="City Name" 
                            variant="outlined" 
                            value={city} 
                            onChange={handleInput} 
                            required 
                            size="small"
                        /><br></br><br></br>
                    </div>
                    <div className="search-button">
                        <Button variant="contained" type="submit">Search</Button>
                    </div>
                </div>
                {error && <p style={{ color: "red" }}>No such place exists</p>}
            </form>
        </div>
    )
}