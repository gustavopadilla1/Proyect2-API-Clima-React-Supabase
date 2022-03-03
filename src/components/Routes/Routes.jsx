import { useState, useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import AppBar from '../../components/AppBar';
 import { Routes , Route } from "react-router-dom";
import Perfiles from "../Perfiles";
import Favoritos from "../Favoritos";
import Home from "../Home";
import MisCiudades from "../MisCiudades";

export default function Rotas({ session }) {
    const [, setLoading] = useState(true);
    const [, setUsername] = useState(null);
    const [, setDireccion] = useState(null);
    const [, setTelefono] = useState(null);
    const [, setOcupacion] = useState(null);
    const [, setFechanacimiento] = useState(null);
    const [, setImgperfiles_url] = useState(null);
    
    useEffect(() => {
        getPerfiles();
    }, [session]);
    
    async function getPerfiles() {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            let { data, error, status } = await supabase
                .from("perfil")
                .select(`username, direccion, telefono, ocupacion, fechanacimiento, imgperfiles_url `)
                .eq("id", user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username);
                setDireccion(data.direccion);
                setTelefono(data.telefono);
                setOcupacion(data.ocupacion);
                setFechanacimiento(data.fechanacimiento);
                setImgperfiles_url(data.imgperfiles_url);
            }
            
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }
   
   

    return (
        
        <div className="form-widget">
         <AppBar/>

           
            <Routes>
            <Route path='/MisCiudades' element={<MisCiudades/>}/>                        

                        <Route path='/Favoritos' element={<Favoritos/>}/>                        

                        <Route path='/Perfiles' element={<Perfiles key={session.user.id} session={session}  />}/>                        
                        <Route path='/' element={<Home key={session.user.id} session={session}/>}/>
            </Routes>

        </div>
    );
}
