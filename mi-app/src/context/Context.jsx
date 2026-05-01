import { createContext, useState, useEffect } from "react";

const ContextContactos = createContext(null);

export const Provider = ({ children }) => {
    // Inicialización: Lee de LocalStorage o empieza con un array vacío
    const [contactos, setContactos] = useState(() => {
        const guardado = localStorage.getItem("mis_contactos");
        return guardado ? JSON.parse(guardado) : [];
    });

    const [chatActivo, setChatActivo] = useState(null);

    // Persistencia: Guarda automáticamente cualquier cambio en los contactos
    useEffect(() => {
        localStorage.setItem("mis_contactos", JSON.stringify(contactos));
    }, [contactos]);

    const obtener = (data) => {
        const nuevo = {
            ...data,
            estado: "online",
            mensajes: []
        };
        setContactos(prev => [...prev, nuevo]);
    };

    const enviarMensaje = (texto) => {
        if (texto.trim().length === 0) { // Usamos .trim() para evitar mensajes de puros espacios
            alert("El mensaje no puede estar vacío");
            return;
        }

        // 1. Agregar mensaje del usuario
        setContactos(prev =>
            prev.map(c => {
                if (c.id !== chatActivo) return c;
                return {
                    ...c,
                    mensajes: [...c.mensajes, { texto, autor: "user" }]
                };
            })
        );

        const saludos = [
            { texto: "¡Hola! ¿Cómo va todo?", link: null },
            { texto: "¡Hola! mi faraon lo ayudare a crear su mazo:", link: "https://imperioyugioh.vercel.app/" },
            { texto: "¡Hola! buzo o remera averigualo aqui:", link: "https://app-clima-jade.vercel.app/" },
            { texto: "Hola como tas queres buscar un gift divertido?", link: "https://patitas-t-pitschool-d1ey.vercel.app/" },
            { texto: "Hola es un buen dia para hacer deberes consulta tus tareas:", link: "https://lista-tarea-reducer-xiw5.vercel.app/" },
            { texto: "Queres ver una peli mirate los estrenos del cine:", link: "https://luflix-wine.vercel.app/" }
        ];

        const respuestaAleatoria = saludos[Math.floor(Math.random() * saludos.length)];

        // 2. Respuesta automática del bot
        setTimeout(() => {
            setContactos(prev =>
                prev.map(c => {
                    if (c.id !== chatActivo) return c;
                    return {
                        ...c,
                        mensajes: [...c.mensajes, {
                            texto: respuestaAleatoria.texto,
                            link: respuestaAleatoria.link,
                            autor: "bot"
                        }]
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