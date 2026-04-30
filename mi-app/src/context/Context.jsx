
import { createContext, useState } from "react";

  const ContextContactos= createContext(null);

export const Provider = ({ children }) => {
 
const [contactos, setContactos] =useState([])
const obtener = (data) => {
    console.log(data)
    setContactos([...contactos, data])
}

 const contact = {
     obtener,
     contactos,
    }
return (
        <ContextContactos.Provider value={contact}>
            {children}
        </ContextContactos.Provider>
    );
};
export default ContextContactos;