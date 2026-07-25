import { useState, useRef, useEffect, useContext } from 'react';
import ContextContactos from '../../context/Context';

const Detalle = () => {
  const { contactos, chatActivo, mensajesActivos, enviarMensaje } = useContext(ContextContactos);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Buscamos el chat usando '_id' de MongoDB
  const chat = contactos.find(c => c._id === chatActivo);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajesActivos]);

  if (!chat) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-950 text-gray-500 space-y-2">
        <span className="text-4xl">💬</span>
        <p className="text-sm font-medium">Selecciona un chat para comenzar la conversación</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-950">
      {/* Cabecera del Chat */}
      <div className="p-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur flex items-center shadow-sm">
        <h2 className="font-bold text-white text-base">{chat.nombre}</h2>
      </div>

      {/* Historial de Mensajes */}
     <div className="flex-1 overflow-y-auto p-4 space-y-3">
  {mensajesActivos.map((msg, i) => (
    <div key={msg._id || i} className="flex flex-col items-start">
      {/* 👈 Mostramos el nombre del usuario que envió el mensaje */}
      <span className="text-xs text-blue-400 font-medium ml-1 mb-1">
        {msg.userId?.nombre || "Desconocido"}
      </span>
      <div className="px-3 py-2 rounded-xl max-w-xs text-sm shadow bg-gray-800 text-white border border-gray-700">
        {msg.content}
      </div>
    </div>
  ))}
  <div ref={bottomRef}></div>
</div>
      

      {/* Input para Enviar Mensaje */}
      <div className="p-4 border-t border-gray-800 bg-gray-900 flex gap-2 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim()) {
              enviarMensaje(input);
              setInput("");
            }
          }}
          placeholder="Escribe un mensaje..."
          className="flex-1 px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 outline-none border border-gray-700 focus:border-blue-500 text-sm transition"
        />
        <button
          onClick={() => {
            if (!input.trim()) return;
            enviarMensaje(input);
            setInput("");
          }}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold rounded-xl text-sm transition shadow-lg"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Detalle;