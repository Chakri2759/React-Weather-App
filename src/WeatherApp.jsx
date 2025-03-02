import SearchBox from './SearchBox';
import InfoBox from './InfoBox';
import { useState } from 'react';
export default function WeatherApp(){
     let [WeatherInfo,setWeatherInfo]=useState({
        city: "Delhi",
        temp: 20.05,
        tempMax: 20.05,
        tempMin: 20.05,
        humidity: 42,
        feelsLike: 19.21,
        weather: "haze"
      })

      function updateInfo(newInfo){
        setWeatherInfo(newInfo);
        
      }
    return(
        <div className='WeatherApp'>
         <SearchBox updateInfo={updateInfo}/>
         <InfoBox info={WeatherInfo}/>
         </div>
    )
}