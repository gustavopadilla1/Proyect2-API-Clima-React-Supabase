import {  useState } from "react";
import { supabase } from "../../config/supabaseClient";
import ImgClima from "../Imgclima";
import { TextField, Button, Box,Grid } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';

import IconButton from '@mui/material/IconButton';
// import { useTranslation } from "react-i18next";


export default function Clima({ session }) {
    const [loading, setLoading] = useState(true);
    const [imgclima_url, setImgClima_url] = useState(null);
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);

    // useEffect(() => {
    //     changeLaguage();
    // },); 
    // const { i18n, t } = useTranslation();
  
    // const changeLaguage = (language) => {
    //   i18n.changeLanguage(language);
    // };

    async function GetClima() {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            let { data, error, status } = await supabase
                .from("clima")
                .select(`imgclima_url, city, country`)
                .eq("perfil", user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setCountry(data.country);
                setCity(data.city);
                setImgClima_url(data.imgclima_url);
                console.log(data);
            }

        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function updateImgClima({ country, city, imgclima_url }) {
        try {
            setLoading(true);
            const user = supabase.auth.user();
            console.log(user.id);
            const updates = {
                imgclima_url,
                city,
                country,
                favorite: false,
                perfil: user.id,
                
            };
            
            console.log(JSON.stringify(updates))

            let { error } = await supabase.from("clima").insert(updates, {
                returning: "minimal", // Don't return the value after inserting
               
            });
            
            if (error) {
              
                throw error;
            }else {
                alert("Agregado en Mis ciudades" ); 
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            GetClima();
            setLoading(false);
        }
    }
    async function AgregarFavorito({ country, city, imgclima_url }) {
        try {
            setLoading(true);
            const user = supabase.auth.user();
            console.log(user.id);
            const updates = {
                imgclima_url,
                city,
                country,
                favorite: true,
                perfil: user.id,
            };
            console.log(JSON.stringify(updates))
            console.log(JSON.stringify("esto mando ahorita"+ updates.imgclima_url))

            let { error } = await supabase.from("clima").insert(updates, {
                returning: "minimal", // Don't return the value after inserting
            });
            if (error) {
                              
                throw error;
            }else {
                alert("Agregado en Favoritos" ); 
            }
           
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            GetClima();
            setLoading(false);
        }
    }
    return (
        <>          
      {/* <h4>{t("Change language")}</h4>
           <Button variant="contained" color='success' 
            className={`App-link ${
              i18n.language === "es" ? "selected" : "unselected"
            }`}
            onClick={() => changeLaguage("es")}
          >
            {t("Spanish")}
          </Button>
        
          <Button variant="contained" color='error'
            className={`App-link ${
              i18n.language === "en" ? "selected" : "unselected"
            }`}
            onClick={() => changeLaguage("en")}
          >
            {t("English")}
           
            </Button>         
             */}
                   
        

        
            <div>
            <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  // style={{ minHeight: '100vh' }}
>
                <Box >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <TextField 
                        id="city"
                        label="city"
                        variant="outlined"
                        type="varchar"
                        value={city || ""}
                        onChange={(e) => setCity(e.target.value)}
                    />
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                     
                    <TextField
                        label="country"
                        variant="outlined"
                        id="country"
                        type="varchar"
                        value={country || ""}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    
                        <button
                        Style="   background-color: #4CAF50; /* Green */
                        border: none;
                        color: white;
                        padding: 15px 32px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 16px;
                        border-radius: 30px;"
                        >
                        {/* {t("search")}                         */}
                        search
                        </button>
                    
                </Box>
                </Grid>
            </div>
            <br /> <br />

            <ImgClima  sx={{ maxHeight: "auto", maxWidth: "auto" }}
            
           
                url={imgclima_url ?? "https://www.emsevilla.es/wp-content/uploads/2020/10/no-image-1.png"}
                size={150}
                onUpload={(url) => {
                    setImgClima_url(url);
                }}
                disabled={loading}
            />
            
            <div>
                <div>


                    <div>
                        <br />
                        <Box sx={{ maxHeight: "auto", maxWidth: "auto", color:"red" }}>
                            <Button sx={{color: "white"}}  if
                                className="button block primary"

                                onClick={() =>
                                    updateImgClima({
                                        country, city, imgclima_url
                                    })
                                   
                                }
                                
                            // disabled={loading}
                           
                            
                           > 
                            {/* {t("ADD")} */}
                            ADD
                            </Button>
                        </Box>
                        
                        <IconButton aria-label="add to favorites"
                            sx={{ direction: "row", alignItems: "center" }}

                            onClick={() =>
                                AgregarFavorito({
                                    country, city, imgclima_url
                                })
                            }
                        // disabled={loading}
                        ><FavoriteIcon />
                        </IconButton>
                    </div>
                    <br /> <br />



                </div>

            </div>                            
        </>        
    )
}
