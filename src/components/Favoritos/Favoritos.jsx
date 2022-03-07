import * as React from 'react';
import {Card, Box} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { supabase } from "../../config/supabaseClient";
import { useState } from "react";
import {  CardHeader, Avatar } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Imgclima from '../Imgclima';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

// import "weather-icons/css/weather-icons.css";


import { WEATHER_KEY } from '../../key';

export default function MultiActionAreaCard(props) {

  const [mostrarCard, setMostrarCard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [img, setImg] = useState(null);
  const [, setImgClima_url] = useState(null);
  const [city, setCity] = React.useState(null);
  const [temp, setTemp] = React.useState(null);
  const [humedad, setHumedad] = React.useState(null);
  const [visibilidad, setVisibilidad] = React.useState(null);
  const [, setCountry] = useState(null);
  const [clima, setClima] = React.useState(null);
  const [ocultarBoton, setOcultarBoton] = React.useState(false);
  const [data, setData] = useState([]);
  // const [icons, setIcons] = React.useState(null);



  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('imgclima').download(path)
      if (error) {
        throw error
      } 
      const url = URL.createObjectURL(data)
      setImg(url)
    } catch (error) {
      console.log('falla de descarga de imagen: ', error.message)
    }
  }
  async function GetClimaCiudades() {
    try {
      setOcultarBoton(true)
      setMostrarCard(false)
        setLoading(false);
        const user = supabase.auth.user();
console.log(user.id)
        let { data, error, status } = await supabase
            .from("clima")
            .select('*')
            .eq("perfil", user.id)
            .eq("favorite",true)
        if (error && status !== 406) {
            throw error;
        }

        if (data) {
            setCountry(data.country);
          setCity(data.city);
            setImgClima_url(data.imgclima_url);
            console.log("mis climas"+data);
            setData(data)
          
        }
    } catch (error) {
        console.log(error);
        alert(error.message);
    } finally {
        setLoading(false);
        setOcultarBoton(true)
    }
}



// Eliminar las cuidades mediante el id
async function DeleteMisCiudades(id){
    try {
    const { data, error } = await supabase

    .from('clima')
    .delete()
    .eq('id', id)

    setLoading(true);

    if (error ) {
            throw error;
    }
    console.log(data)
    } catch (error) {
        console.log(error);
        alert(error.message);
    } finally {
        setLoading(false);
        GetClimaCiudades();
    }
}


       
         

//Obtener la informacion de mi ciudad selecciona 
// pasando como parametros la ciuidad y el country y la img para pasarla 
// a otra funcion  de descargar imagen
async function miCuidad(ciudad,country,img ) {

  const cityValue=ciudad.toLowerCase();
  downloadImage(img)
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${country}&appid=${WEATHER_KEY}&units=metric`;
      const response = await fetch(API_URL);
      const data = await response.json();
        
    //   this.state = {      
    //     icon:'' 
    // };  
    
    //   this.weatherIcon = {
    //     Thunderstorm: "wi-thunderstorm",
    //     Drizzle: "wi-sleet",
    //     Rain: "wi-storm-showers",
    //     Snow: "wi-snow",
    //     Atmosphere: "wi-fog",
    //     Clear: "wi-day-sunny",
    //     Clouds: "wi-day-fog"       
    //   }; 

    //   async function get_WeatherIcon(icons, rangeId){
    //     switch (true) {
    //       case rangeId >= 200 && rangeId < 232:
    //         this.setState({ icon: icons.Thunderstorm });
    //         break;
    //       case rangeId >= 300 && rangeId <= 321:
    //         this.setState({ icon: icons.Drizzle });
    //         break;
    //       case rangeId >= 500 && rangeId <= 521:
    //         this.setState({ icon: icons.Rain });
    //         break;
    //       case rangeId >= 600 && rangeId <= 622:
    //         this.setState({ icon: icons.Snow });
    //         break;
    //       case rangeId >= 701 && rangeId <= 781:
    //         this.setState({ icon: icons.Atmosphere });
    //         break;
    //       case rangeId === 800:
    //         this.setState({ icon: icons.Clear });
    //         break;
    //       case rangeId >= 801 && rangeId <= 804:
    //         this.setState({ icon: icons.Clouds });
    //         break;
    //       default:
    //         this.setState({ icon: icons.Clouds });
    //     }
    //   }

      console.log(data)
      setMostrarCard(true) 
      setCity(data.name)
      setTemp(data.main.temp)
      setHumedad(data.main.humidity)
      setClima(data.weather[0].description)
      setVisibilidad(data.visibility)
      // setIcons({icon:this.weatherIcon.Thunderstorm})  

      // get_WeatherIcon(this.weatherIcon, data.weather[0].id);
    


alert("Tus cuidades favoritas se cargaron correctamente")
  

}

  return (
    <>
    <br></br><br></br>
    {/* Style ="    border: 1px solid var(--custom-color-brand);" */}
  {mostrarCard ?
 
    <Card sx={{ maxHeight: "auto", maxWidth: "auto" }} >
      <CardHeader  sx={{ maxHeight: "auto", maxWidth: "auto" }}
        avatar={
          <Avatar aria-label="recipe">
            <CardMedia
     component="img"
     height="40"
     image={img}
     alt="green iguana"
   />
          </Avatar>
        }
        title={city}
      />
    <CardActionArea>
      <CardContent sx={{ maxHeight: "auto", maxWidth: "auto" }}  Style=" text-align: center;">  
     
      {/* <div>
            <i className={`wi ${data.weatherIcon}`}
              Style="font-size: 100px;">
            </i>
          </div> */}

          <br />
      <Typography gutterBottom variant="h4" component="div">

          Temperatura:{temp}
        </Typography>
      <Typography gutterBottom variant="h5" component="div">
          Clima:{clima}
        </Typography>     
        <Typography variant="h6" color="text.secondary">
         Visibilidad:{visibilidad}
        </Typography>
        <Typography variant="h6" color="text.secondary">
         Humedad:{humedad}
        </Typography>
      </CardContent>
      <br />
      <Button  variant="outlined" onClick={GetClimaCiudades} color="primary" Style="margin:20px">
Regresar
</Button>
    </CardActionArea>
   </Card>
   :
   <Box sx={{
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    p: 1,
    m: 1,
    bgcolor: 'background.paper',
    maxWidth: 'auto',
    height: 'auto',
    borderRadius: 1,
  }} >

{
data.map(ciudad => (
  <Card sx={{
    maxWidth: "100"
  }}>
  <CardActionArea>
  <Imgclima sx={{ maxWidth: "100" }}
            // height="194"
            
            url={ciudad.imgclima_url ?? "https://www.emsevilla.es/wp-content/uploads/2020/10/no-image-1.png"}
            size={150}
            onUpload={(url) => {
                setImgClima_url(url);    
                                
            }}
           
            disabled={loading}
        />
  {/* <img src={ciudad.imgclima_url} alt={ciudad.imgclima_url} className="poke-image"  /> */}
        <CardMedia></CardMedia>
     
    <CardContent>
      <Typography gutterBottom variant="h7" component="div">
     
      <p>Cuidad: {ciudad.city}</p>
      </Typography>
      <Typography variant="body2" color="text.secondary">
      <p>Country: {ciudad.country}</p>
     <Box>
     
                        
      <IconButton variant="contained"  onClick={() => 
                    // EditarRecordatorio({ title, dateMemories, contain })
                    DeleteMisCiudades(ciudad.id)
                } color="error">  <HeartBrokenIcon />
        </IconButton>
        <Button  variant="outlined" onClick={()=>
          miCuidad(ciudad.city,ciudad.country,ciudad.imgclima_url)
          } color="primary"
           
      // weatherIcon={this.state.icon}      
          >
Ver mas
  </Button>
      </Box>
      </Typography>
    </CardContent>
  </CardActionArea>
</Card>

 ))   }
 {!ocultarBoton ?
<Box sx={{maxHeight: 250}}>

<Button  variant="outlined" onClick={GetClimaCiudades} color="primary" >
Ver mis ciudades favoritas
</Button>
  </Box>
:
       <Box sx={{maxHeight: 50}}>
           </Box>
 }
</Box>
   }
   </>
  )
}