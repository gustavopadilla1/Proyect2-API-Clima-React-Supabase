import React from 'react';
import UpdateImgClima from '../UpdateImgClima';

export default function WeatherForm(props) {
  return (
  
    <div className="card card-body">
        <br/>
    <form onSubmit={props.getWeather} >
        <div className="form-group">        
        <br/>
        <UpdateImgClima/>  
        </div>       
    </form>
</div>
   
  );
}