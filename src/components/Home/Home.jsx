import React, { Component } from 'react';
import AppBar from '../../components/AppBar';
import WeatherForm from '../Formulario';
import WeatherInfo from '../Card';
import { WEATHER_KEY } from '../../key';
// import { Box } from '@mui/material';
// import InfoClima from '../InfoClima';

import "weather-icons/css/weather-icons.css";

class Home extends Component {
    constructor() {
super();
    this.state = {
        temperature: '',
        description: '',
        humidity: '',
        wind_speed: 0,
        city: '',
        country: '',
        temp_max: '',
        temp_min: '',
        icon:'' ,

        error: null
        
    };
    this.weatherIcon = {
        Thunderstorm: "wi-thunderstorm",
        Drizzle: "wi-sleet",
        Rain: "wi-storm-showers",
        Snow: "wi-snow",
        Atmosphere: "wi-fog",
        Clear: "wi-day-sunny",
        Clouds: "wi-day-fog"       
      }; 

    }

    get_WeatherIcon(icons, rangeId) {
        switch (true) {
          case rangeId >= 200 && rangeId < 232:
            this.setState({ icon: icons.Thunderstorm });
            break;
          case rangeId >= 300 && rangeId <= 321:
            this.setState({ icon: icons.Drizzle });
            break;
          case rangeId >= 500 && rangeId <= 521:
            this.setState({ icon: icons.Rain });
            break;
          case rangeId >= 600 && rangeId <= 622:
            this.setState({ icon: icons.Snow });
            break;
          case rangeId >= 701 && rangeId <= 781:
            this.setState({ icon: icons.Atmosphere });
            break;
          case rangeId === 800:
            this.setState({ icon: icons.Clear });
            break;
          case rangeId >= 801 && rangeId <= 804:
            this.setState({ icon: icons.Clouds });
            break;
          default:
            this.setState({ icon: icons.Clouds });
        }
      }
     
    
    getWeather = async (e) => {
        e.preventDefault();
        const { city, country } = e.target.elements;
        const cityValue = city.value;
        const countryValue = country.value;
        
        if (cityValue && countryValue) {
            // metric parameter is for Celcius Unit
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${WEATHER_KEY}&units=metric`;
            const response = await fetch(API_URL);
            const data = await response.json();
            console.log(data)

            this.setState({
                temperature: data.main.temp,
                description: data.weather[0].description,
                humidity: data.main.humidity,
                wind_speed: data.wind.speed,
                city: data.name,
                country: data.sys.country,
                temp_max: data.main.temp_max,
                temp_min: data.main.temp_min,
                icon: this.weatherIcon.Thunderstorm,  
                error: null
            });
            this.get_WeatherIcon(this.weatherIcon, data.weather[0].id);
            
        } else {
            this.setState({
                error: 'digita ciudad y país.'
            });
        }

      
    }

    render() {
        return (
            <>
                        <AppBar/>

        <div 
        Style=" margin: 1rem; padding: 1rem; text-align: center;">

            <div>
              

                <div >

            
                {/* <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                maxHeight: "auto",
                maxWidth: "auto",
                cursor: "pointer",
            }}> */}
                    <WeatherForm 
                        getWeather={this.getWeather}
                    />
                
                    <WeatherInfo {...this.state} weatherIcon={this.state.icon}
                                
                    />
                    
                   
                {/* </Box>  */}
                </div>
            </div>
        </div>
        </>
        );
    }
}

export default Home;