import { createContext, useState, useEffect } from "react";
import { 
    getChatsApi, 
    crearChatApi, 
    enviarMensajeApi, 
    getMensajesApi, 
    getUsuariosApi, 
    crearUsuarioApi, 
    deleteChatApi 
} from "../../services/api";

const ContextContactos = createContext(null);

export const Provider = ({ children }) => {
    const [contactos, setContactos] = useState([]); 
    const [chatActivo, setChatActivo] = useState(null);
    const [mensajesActivos, setMensajesActivos] = useState([]);
    
  
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioActualId, setUsuarioActualId] = useState(null);

    useEffect(() => {
        getChatsApi()
            .then(data => setContactos(data))
            .catch(err => console.error("Error al cargar chats:", err));

        getUsuariosApi()
            .then(data => {
                setUsuarios(data);
                if (data && data.length > 0) {
                    setUsuarioActualId(data[0]._id); 
                }
            })
            .catch(err => console.error("Error al cargar usuarios:", err));
    }, []);

  
    useEffect(() => {
        if (!chatActivo) return;
        getMensajesApi(chatActivo)
            .then(data => setMensajesActivos(data))
            .catch(err => console.error("Error al cargar mensajes:", err));
    }, [chatActivo]);

   
    const crearUsuario = async (dataForm) => {
        try {
            const nuevoUsuario = await crearUsuarioApi(dataForm);
            setUsuarios(prev => [...prev, nuevoUsuario]);
            setUsuarioActualId(nuevoUsuario._id); 
        } catch (error) {
            console.error("Error al crear usuario:", error);
        }
    };

   
    const obtener = async (dataForm) => {
        try {
            const nuevoChat = await crearChatApi({
                nombre: dataForm.nombre,
                participantes: usuarioActualId ? [usuarioActualId] : []
            });
            setContactos(prev => [...prev, nuevoChat]);
        } catch (error) {
            console.error("Error al crear chat:", error);
        }
    };

  
    const eliminarChat = async (chatId) => {
        try {
            await deleteChatApi(chatId);
            setContactos(prev => prev.filter(c => c._id !== chatId));
            
           
            if (chatActivo === chatId) {
                setChatActivo(null);
                setMensajesActivos([]);
            }
        } catch (error) {
            console.error("Error al eliminar chat:", error);
        }
    };

  
    const enviarMensaje = async (texto) => {
        if (texto.trim().length === 0 || !chatActivo || !usuarioActualId) return;

        try {
            const mensajeEnviado = await enviarMensajeApi({
                chatId: chatActivo,
                userId: usuarioActualId,
                content: texto
            });

            setMensajesActivos(prev => [...prev, mensajeEnviado]);
        } catch (error) {
            console.error("Error al enviar mensaje:", error);
        }
    };

    const contact = {
        obtener,
        contactos,
        chatActivo,
        setChatActivo,
        mensajesActivos,
        enviarMensaje,
        usuarios,
        usuarioActualId,
        setUsuarioActualId,
        crearUsuario,
        eliminarChat 
    };

    return (
        <ContextContactos.Provider value={contact}>
            {children}
        </ContextContactos.Provider>
    );
};

export default ContextContactos;


