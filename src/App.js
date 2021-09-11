import React, {useState} from 'react';
import './App.css';

const api ={
  key : "7709e06392b9c91050718a09841f32b0",
  baseUrl: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = event =>{
    if(event.key === "Enter" ){
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result =>
        { 
          setQuery('');
          setWeather(result);
          console.log(result)
        });
    }
  }

  const dateBuilder = (d) =>{
    let months = [
      "January", "February", "March","April","May","June","July","August","September","October","November","December"
    ];
    let days= ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday","Friday","Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = d.getMonth() ;
    let year = d.getFullYear();

    return `${day} ${date} ${months[month]} ${year}`;
  }

  return (
    <div className={
      (typeof weather.main != 'undefined') ? (
      (weather.main.temp >= 16)
      ?  'app warm'
      : "app"
    ): "app"}>
      <main>
        <div className="search-box">
          <input 
          type="text" 
          className="search" 
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
          
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div>
        <div className="location-box">
        <div className="location">
          
        {weather.name},{weather.sys.country}
        </div>
        <div className="date">
          {dateBuilder(new Date())}
        </div>
      </div>
      <div className="weather-box">
        <div className="temp">
          {Math.round(weather.main.temp)}°c
        </div>
        <div className="weather">
          {weather.weather[0].description}
        </div>
      </div>
        </div>
   ) : ('')}
        
      </main>
    </div>
  );
}

export default App;
