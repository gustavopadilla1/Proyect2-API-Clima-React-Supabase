import { useState } from 'react'
import { supabase } from '../../config/supabaseClient'
import {Button} from '@mui/material';
import { useTranslation } from "react-i18next";

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('¡Revise su correo electrónico para el enlace de inicio de sesión!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const { i18n, t } = useTranslation();
  
  const changeLaguage = (language) => {
    i18n.changeLanguage(language);
  };
   


  return (
    <div>
      <h4>{t("welcome")}</h4>
      <h4>{t("Change language")}</h4>
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
     
    
    <div className="row flex flex-center">

      <div  Style="position: relative; background: #FFFFFF;
                max-width: 500px;
                margin: 0 auto 100px;
                padding: 70px;
                text-align: center;
                box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);">

        <h1 className="header" Style="">{t("Log in")}</h1>
        <p className="description"> <br />
        {t("log in via the magic link with your email below")}        
        </p>

        <div>
          <input
            className="inputField"
            type="email"
            placeholder={t("enter your email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div> <br /> <br />
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className={'button block'}
            disabled={loading}
          >
            {loading ? <span>{t("Loading")}</span> : <span>{t("Send access link")}</span>}
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}