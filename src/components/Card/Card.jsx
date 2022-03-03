import * as React from 'react';
import { CardContent,Card, CardHeader,CardActions, Avatar } from '@mui/material';
import IconButton  from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Box } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import { useEffect } from 'react';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const WeatherInfo = props => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    changeLaguage();
},);    
  const { i18n, t } = useTranslation();
  
  const changeLaguage = (language) => {
    i18n.changeLanguage(language);
  };
   
console.log("esto mando" + JSON.stringify(props))



    return (  
      <Box  sx={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth:"auto",
        maxHeight: "auto",
        cursor: "pointer",
      }}>        

        <Card sx={{ maxWidth: 500 }} >
            <CardHeader sx={{ maxWidth: 500 }}
        avatar={
          <Avatar  aria-label="recipe">                  
            J
          </Avatar>
        }
        action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.city}

          subheader={props.country}

        />
       

    <CardContent variant="outlined" sx={{ maxWidth: 500 }}>
  
    {
                props.error &&
                <div className="alert alert-danger">
                    <p>{props.error}</p>
                </div>
            }
            {props.temperature ?
                <div className="card card-body mt-2 animated fadeInUp" >
                   
                    {
                        props.temperature &&
                        <p><i className="fas fa-temperature-low"></i> {t("Temperature")}: {props.temperature} ℃, {props.description}</p>
                    }
                        {
                        props.city && props.country &&
                        <p><i className="fas fa-location-arrow"></i> {t("Location")}: {props.city},   {props.country}</p>
                    }
                    
                </div>
                :
                <div className="card card-body mt-2 text-center">
                    <i className="fas fa-sun fa-10x"></i>
                </div>
            }
            
      </CardContent>
      <CardActions disableSpacing>
      <Typography paragraph>{t("See more information")}</Typography>  
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent variant="outlined" sx={{ maxWidth: 345 }}>
          <Typography paragraph>{t("More information")}:</Typography>      
            {
                        props.humidity &&
                        <p><i className="fas fa-water"></i> {t("Humidity")}: {props.humidity}</p>
                    }
                    {
                        props.temp_max &&
                        <p><i className="fas fa-water"></i>{t("Temperature Max")} : {props.temp_max}</p>
                    }
                     {
                        props.temp_min &&
                        <p><i className="fas fa-water"></i>{t("Temperature Minima")} : {props.temp_min}</p>
                    }
                    {
                        props.wind_speed &&
                        <p><i className="fas fa-wind"></i> {t("Wind Speed")}: {props.wind_speed}</p>
                    }             
        </CardContent>
      </Collapse>
    </Card>
    </Box>

  );
}
export default WeatherInfo;