import { useState, useRef, useEffect } from 'react';
import { useContext } from 'react';
import ContextContactos from '../../context/Context';

const Detalle = () => {
  const { contactos, chatActivo, enviarMensaje } = useContext(ContextContactos);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const chat = contactos.find(c => c.id === chatActivo);

 
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.mensajes]);

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-950 text-gray-400">
        Seleccioná un chat 👈
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-950 text-green-500">

    
      <div className="p-4 border-b border-gray-800 bg-gray-900">
        <h2 className="font-semibold text-lg">{chat.nombre}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chat.mensajes.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.autor === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-xs text-sm shadow
                ${msg.autor === "user"
                  ? "bg-green-500 text-black"
                  : "bg-gray-800 text-white"}
              `}
            >
                    {msg.texto}
                    {msg.link && (
                      <a 
                        href={msg.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {msg.link}
                      </a>
                    )}
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className="p-3 border-t border-gray-800 bg-gray-900 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribí un mensaje..."
          className="flex-1 p-2 rounded-lg bg-gray-800 text-white 
                     placeholder-gray-400 outline-none 
                     focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={() => {
            if (!input.trim()) return;
            enviarMensaje(input);
            setInput("");
          }}
          className="px-4 py-2 bg-green-500 text-black rounded-lg 
                     font-medium hover:bg-green-600 
                     active:scale-95 transition"
        >
          Enviar
        </button>
      </div>

    </div>
  );
};

export default Detalle;