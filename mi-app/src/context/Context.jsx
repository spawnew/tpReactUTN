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
    
    // Estados para los usuarios
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioActualId, setUsuarioActualId] = useState(null);

    // Cargar chats y usuarios al iniciar
    useEffect(() => {
        getChatsApi()
            .then(data => setContactos(data))
            .catch(err => console.error("Error al cargar chats:", err));

        getUsuariosApi()
            .then(data => {
                setUsuarios(data);
                if (data && data.length > 0) {
                    setUsuarioActualId(data[0]._id); // Selecciona el primero por defecto
                }
            })
            .catch(err => console.error("Error al cargar usuarios:", err));
    }, []);

    // Cargar mensajes al cambiar de chat
    useEffect(() => {
        if (!chatActivo) return;
        getMensajesApi(chatActivo)
            .then(data => setMensajesActivos(data))
            .catch(err => console.error("Error al cargar mensajes:", err));
    }, [chatActivo]);

    // Crear un nuevo Usuario
    const crearUsuario = async (dataForm) => {
        try {
            const nuevoUsuario = await crearUsuarioApi(dataForm);
            setUsuarios(prev => [...prev, nuevoUsuario]);
            setUsuarioActualId(nuevoUsuario._id); // Lo pone como usuario activo al crearlo
        } catch (error) {
            console.error("Error al crear usuario:", error);
        }
    };

    // Crear un nuevo Chat
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

    // 👈 FUNCIÓN PARA ELIMINAR CHAT (Restaurada)
    const eliminarChat = async (chatId) => {
        try {
            await deleteChatApi(chatId);
            setContactos(prev => prev.filter(c => c._id !== chatId));
            
            // Si el chat borrado era el que estaba activo, lo cerramos
            if (chatActivo === chatId) {
                setChatActivo(null);
                setMensajesActivos([]);
            }
        } catch (error) {
            console.error("Error al eliminar chat:", error);
        }
    };

    // Enviar mensaje usando el usuario seleccionado
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
        eliminarChat // 👈 Exportado correctamente en el contexto
    };

    return (
        <ContextContactos.Provider value={contact}>
            {children}
        </ContextContactos.Provider>
    );
};

export default ContextContactos;


