import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Tooltip, Box, IconButton, Button } from '@mui/material';
import { supabase } from "../../config/supabaseClient";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import{useEffect} from 'react';

const Navbar = () => {    
    useEffect(() => {
        changeLaguage();
    },);    
      const { i18n, t } = useTranslation();
      
      const changeLaguage = (language) => {
        i18n.changeLanguage(language);
      };
    return (
        
        <div>
            
            <Box sx={{ flexGrow: 1 }}>
                {/* <AppBar position="static"  color='primary'> */}
                <AppBar position="fixed" color='primary'>

                    <Toolbar> 
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            {/* <MenuIcon /> */}

                        </IconButton>
                        <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/">
                        {t("Home")}
                        </Link>
                        </Typography>

                        <Button color="inherit" >                            
                            <a style={{ textDecoration: "none", color: "Black" }} href='https://github.com/gustavopadilla1/Proyect2-API-Clima-React-Supabase.git'> Git Hub </a>
                        </Button>

                        <Button color="inherit" onClick={() => supabase.auth.signOut()}>                        
                        {t("Exit")}
                    </Button>
                                              
                            <Button color="inherit" >
                                <Link to="/Perfiles">                                
                                {t("Profile")}
                                </Link>
                                </Button>
                                <Button color="inherit" >
                                <Link to="/Favoritos">                                
                                {t("Favorites")}
                                </Link>
                                </Button>
                                <Button color="inherit" >
                                <Link to="/MisCiudades">                                
                                {t("My cities")}
                                </Link>
                                </Button>
                        

                        <Tooltip title="Open settings">
                            <IconButton sx={{ p: 0 }}>
                                <Avatar alt="j">                                
                                </Avatar>                            

                                {/* <ImgPerfiles            
                url={imgperfiles_url}
                size={150}
                onUpload={(url) => {
                    setImgperfiles_url(url);
                    updatePerfiles({  imgperfiles_url: url });
                }}
            /> */}
                            </IconButton>
                        </Tooltip>

                    </Toolbar>

                </AppBar>
            </Box>
           


        </div>
    );
}

export default Navbar