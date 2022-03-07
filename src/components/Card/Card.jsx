import * as React from 'react';
import { CardContent, Card, CardHeader, CardActions, Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// import { Box } from '@mui/material';
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
  });
  const { i18n, t } = useTranslation();

  const changeLaguage = (language) => {
    i18n.changeLanguage(language);
  };

  console.log("esto mando" + JSON.stringify(props))



  return (


    // <Box  sx={{
    //   display: "flex",
    //   justifyContent: "space-between",
    //   maxWidth:"auto",
    //   maxHeight: "auto",
    //   cursor: "pointer",
    // }}>        



    <Card sx={{ maxHeight: "auto", maxWidth: "auto" }}>

      <CardHeader sx={{ maxHeight: "auto", maxWidth: "auto" }}
        avatar={
          <Avatar aria-label="recipe">
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


      <CardContent variant="outlined" sx={{ maxHeight: "auto", maxWidth: "auto" }}>

        {
          props.error &&
          <div className="alert alert-danger">
            <p>{props.error}</p>
          </div>
        }
        {props.temperature ?
          <div className="card card-body mt-2 animated fadeInUp" >


            {
              props.city && props.country &&
              <h1>
                <i className="fas fa-location-arrow"></i>
                {t("Location")}: {props.city},   {props.country}
              </h1>
            }



          </div>

          :
          <div className="card card-body mt-2 text-center">
            {/* <i className="fas fa-sun fa-10x"></i> */}
          </div>


        }



      </CardContent >
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
        <CardContent variant="outlined" sx={{ maxHeight: "auto", maxWidth: "auto" }}>
          <Typography paragraph>{t("More information")}:</Typography> 
          <br/><br/>

          <div>
            <i className={`wi ${props.weatherIcon}`}
              Style="font-size: 150px;">
            </i>
          </div>



          {
            props.temperature &&
            <h1><i className="fas fa-temperature-low"></i> {t("Temperature")}: {props.temperature} &deg; </h1>
          }

          {
            props.humidity &&
            <h2> {t("Humidity")}: {props.humidity}</h2>
          }

          {
            // props.temp_max && props.temp_min &&
            // <h3><spam>{t("Temperature Max")} : {props.temp_max}  ℃ </spam>                

            // <spam>{t("Temperature Minima")} : {props.temp_min}  ℃</spam></h3>

            props.temp_max && props.temp_min &&
            <h3><spam>Tem. Max : &nbsp; {props.temp_max} &deg;  &nbsp;&nbsp;&nbsp;&nbsp;  </spam>

              <spam> Tem. Min : &nbsp;{props.temp_min} &deg;</spam>

            </h3>

          }


          {
            props.description &&
            <h4> {props.description}</h4>
          }

          {
            props.wind_speed &&
            <h4> {t("Wind Speed")}: {props.wind_speed}</h4>
          }


        </CardContent>
      </Collapse>
    </Card>

  );
}


export default WeatherInfo;