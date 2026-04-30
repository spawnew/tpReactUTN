
import { createContext, useState } from "react";

  const ContextContactos= createContext(null);

export const Provider = ({ children }) => {
 
const [contactos, setContactos] = useState([]);
const [chatActivo, setChatActivo] = useState(null);

const obtener = (data) => {
  const nuevo = {
    ...data,
    estado: "online",
    mensajes: []
  };

  setContactos(prev => [...prev, nuevo]);
    }; const enviarMensaje = (texto) => {
        if (texto.length === 0) {
            alert("El mensaje no puede estar vacio");
            return;
        }
  setContactos(prev =>
    prev.map(c => {
      if (c.id !== chatActivo) return c;

      return {
        ...c,
        mensajes: [...c.mensajes, { texto, autor: "user" }]
      };
    })
  );

 
  setTimeout(() => {
    setContactos(prev =>
      prev.map(c => {
        if (c.id !== chatActivo) return c;

        return {
          ...c,
          mensajes: [...c.mensajes, { texto: "Hola! 👋 ", autor: "bot" }]
        };
      })
    );
  }, 1000);
    };
    const contact = {
  obtener,
  contactos,
  chatActivo,
  setChatActivo,
  enviarMensaje
};
return (
        <ContextContactos.Provider value={contact}>
            {children}
        </ContextContactos.Provider>
    );
};
export default ContextContactos;