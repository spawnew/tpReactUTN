const API_URL = "http://localhost:3000";

// --- USUARIOS ---
export const getUsuariosApi = async () => {
    const res = await fetch(`${API_URL}/usuarios`);
    const data = await res.json();
    return data.data;
};

export const crearUsuarioApi = async (usuarioData) => {
    const res = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioData)
    });
    const data = await res.json();
    return data.data;
};
export const deleteChatApi = async (chatId) => {
    const res = await fetch(`${API_URL}/chat/${chatId}`, {
        method: "DELETE"
    });
    const data = await res.json();
    return data.data;
};

// --- CHATS ---
export const getChatsApi = async () => {
    const res = await fetch(`${API_URL}/chat`);
    const data = await res.json();
    return data.data;
};

export const crearChatApi = async (chatData) => {
    const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chatData)
    });
    const data = await res.json();
    return data.data;
};

// --- MENSAJES ---
export const getMensajesApi = async (chatId) => {
    const res = await fetch(`${API_URL}/mensajes/${chatId}`);
    const data = await res.json();
    return data.data;
};

export const enviarMensajeApi = async (mensajeData) => {
    const res = await fetch(`${API_URL}/mensajes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mensajeData)
    });
    const data = await res.json();
    return data.data;
};