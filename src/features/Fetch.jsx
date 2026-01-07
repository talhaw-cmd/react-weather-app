import React, { useEffect, useRef } from 'react'
import axios from 'axios';
import { useState } from 'react'
import '../index.css'

const Fetch = () => {
  // const [city, setcity] = useState("")
  const [data, setdata] = useState(null)
  const [load, setload] = useState(false)
  const input = useRef()

  
  const handleSearch = async () => {

    const cityName = input.current.value;

    setload(true)


    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: { q: cityName },
      headers: {
        'x-rapidapi-key': '0deb96e946msh32ac7e94a34ffe0p1fbfddjsnb6c4ca316cf4',
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setdata(response.data)
    } catch (error) {
      console.error(error);
    }
    finally {
      setload(false)
    }
  }



  if (load) {
    return (<h2>Loading...</h2>)
  }
  return (

    <div className='body'>


      <div className="weather-card">

        <div className="search-container">
          <input ref={input} type="text" placeholder="Enter city name" id="cityInput" />
          <button onClick={handleSearch} id="searchBtn">Search</button>
        </div>

      {data?"": <h4>Enter your City Name for weather details</h4>}
      <div style={{ display: data ? "block" : "none" }}>
      <div className='main-part'>
        <div className="city">{data ?data.location.name:"----"}</div>
        <div className="temp">{data ?data.current.temp_c: "----"}°C</div>
        <div className="condition">{data?data.current.condition.text: "----"}</div>
        </div>
        <div className="details">
          <div className='details-col'>
            <span>Humidity: <b> {data?data.current.humidity: "----"} </b></span>
            <span>Wind:     <b> {data?data.current.wind_kph: "----"}km </b></span>
          </div>
                   <div className='details-col'>
            <span>FeelsLike: <b> {data? data.current.feelslike_c: "----"}°C </b></span>
            <span>DewPoint:     <b> {data?data.current.dewpoint_c: "----"}°C </b></span>
          </div>
        </div>
        </div>
      </div>

    </div>

  )
}

export default Fetch
