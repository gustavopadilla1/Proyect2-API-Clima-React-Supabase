import * as React from 'react';
import {Card, Box} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { supabase } from "../../config/supabaseClient";
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Imgclima from '../Imgclima';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from "react-i18next";
import{useEffect} from 'react';

export default function MultiActionAreaCard(props) {
  const [loading, setLoading] = useState(true);
  const [, setImgClima_url] = useState(null);
  const [, setCity] = useState(null);
  const [, setCountry] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    changeLaguage();
},);    
  const { i18n, t } = useTranslation();
  
  const changeLaguage = (language) => {
    i18n.changeLanguage(language);
  };

 
  async function GetClimaCiudades() {
    try {
        setLoading(false);
        const user = supabase.auth.user();
console.log(user.id)
        let { data, error, status } = await supabase
            .from("clima")
            .select('*')
            .eq("perfil", user.id)
            .eq("favorite",false)
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
    }
}
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



  return (
    <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        maxHeight: "auto",
        cursor: "pointer",
      }}>
    
    {
    data.map(ciudad => (
      <Card sx={{
        maxWidth: "auto"
      }}>
      <CardActionArea>
      <Imgclima sx={{ maxWidth: "auto" }}
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
           <p>{t("Id")}: {ciudad.id}</p> 
          </Typography>
          <Typography variant="body2" color="text.secondary">
          <p>{t("Country")}: {ciudad.country}</p>
          <p>{t("City")}: {ciudad.city}</p>
         <Box>
          <IconButton variant="contained"  onClick={() => 
                        // EditarRecordatorio({ title, dateMemories, contain })
                        DeleteMisCiudades(ciudad.id)
                    } color="error">  <DeleteIcon /> 
            </IconButton>
          </Box>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    
     ))   }
    <Box sx={{maxHeight: 250}}>
    <Button  variant="outlined" onClick={GetClimaCiudades} color="primary">
    {t("SEE MY CITIES")}
      </Button>
     
      </Box>
    </Box>
  
    
   
  )
}
