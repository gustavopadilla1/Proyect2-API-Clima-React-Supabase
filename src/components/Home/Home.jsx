import React, { Component } from 'react';
import AppBar from '../../components/AppBar';
import WeatherForm from '../Formulario';
import WeatherInfo from '../Card';
import { WEATHER_KEY } from '../../key';
import { Box } from '@mui/material';
// import InfoClima from '../InfoClima';



class Home extends Component {
    

    state = {
        temperature: '',
        description: '',
        humidity: '',
        wind_speed: 0,
        city: '',
        country: '',
        temp_max: '',
        temp_min: '', 
        error: null
    };
    
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
                error: null
            });
        } else {
            this.setState({
                error: 'digita ciudad y país.'
            });
        }

    }

    render() {
        return <div className="container p-4">

  
            <div className="row">
              

                <div className="col-md-6 mx-auto">

                <AppBar/>
                <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                maxHeight: "auto",
                maxWidth: "auto",
                cursor: "pointer",
            }}>
                    <WeatherForm 
                        getWeather={this.getWeather}
                    />
                
                    <WeatherInfo {...this.state} />
                    
                   
                </Box> 
                </div>
            </div>
        </div>
    }
}

export default Home;