import React from 'react';
import UpdateImgClima from '../UpdateImgClima';

export default function WeatherForm(props) {
  return (
    <form onSubmit={props.getWeather} >              
        <UpdateImgClima/>         
    </form>

   
  );
}