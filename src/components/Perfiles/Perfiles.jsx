import { useState, useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import ImgPerfiles from "../ImgPerfiles";
import AppBar from '../../components/AppBar';
import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";



export default function Perfiles({ session }) {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [direccion, setDireccion] = useState(null);
    const [telefono, setTelefono] = useState(null);
    const [ocupacion, setOcupacion] = useState(null);
    const [fechanacimiento, setFechanacimiento] = useState(null);
    const [imgperfiles_url, setImgperfiles_url] = useState(null);

    useEffect(() => {
        getPerfiles();
    }, [session]);

    // useEffect(() => {
    //     changeLaguage();
    // },);    
    //   const { i18n, t } = useTranslation();
      
    //   const changeLaguage = (language) => {
    //     i18n.changeLanguage(language);
    //   };
    

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
                console.log(data);
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function updatePerfiles({ username, direccion, telefono, ocupacion, fechanacimiento, imgperfiles_url  }) {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            const updates = {
                id: user.id,
                username,
                direccion, 
                telefono, 
                ocupacion, 
                fechanacimiento, 
                imgperfiles_url,
                updated_at: new Date(),
            };

            let { error } = await supabase.from("perfil").upsert(updates, {
                returning: "minimal", // Don't return the value after inserting
            });

            if (error) {
                throw error;
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
  
            <ImgPerfiles            
                url={imgperfiles_url}
                size={150}
                onUpload={(url) => {
                    setImgperfiles_url(url);
                    updatePerfiles({ username, direccion, telefono, ocupacion, fechanacimiento, imgperfiles_url: url });
                }}
            />
            <div>
                <label htmlFor="email">                
                {/* {t("Email")} */}
                    EMAIL
                </label>
                <input
                    id="email"
                    type="text"
                    value={session.user.email}
                    disabled
                />
            </div>
            <div>
                <label htmlFor="username">
                {/* {t("NAME")} */}
                NAME
                </label>
                <input
                    id="username"
                    type="text"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="direccion">                
                {/* {t("ADDRESS")} */}
                ADDRESS
                </label>
                <input
                    id="direccion"
                    type="text"
                    value={direccion || ""}
                    onChange={(e) => setDireccion(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="telefono">                
                {/* {t("TELEPHONE")} */}
                TELEPHONE
                </label>
                <input
                    id="telefono"
                    type="Number"
                    value={telefono || ""}
                    onChange={(e) => setTelefono(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="ocupacion">                
                {/* {t("OCUPATION")} */}
                OCUPATION
                </label>
                <input
                    id="ocupacion"
                    type="text"
                    value={ocupacion || ""}
                    onChange={(e) => setOcupacion(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="fechanacimiento">                
                {/* {t("DATE OF BIRTH")} */}
                DATE OF BIRTH
                </label>
                <input
                    id="fechanacimiento"
                    type="text"
                    value={fechanacimiento || ""}
                    onChange={(e) => setFechanacimiento(e.target.value)}
                />
            </div>

            <div>
                <button                
                    className="button block primary"
                    onClick={() =>
                        updatePerfiles({ username, direccion, telefono, ocupacion, fechanacimiento, imgperfiles_url })
                    }
                    disabled={loading}
                > <Link to="/" >
                    {loading ? "Loading ..." : "Update"}
                    </Link>
                </button>
            </div>
        
        </div>
    );
}
