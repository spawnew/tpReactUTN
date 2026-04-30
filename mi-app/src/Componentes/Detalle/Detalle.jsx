import  { useState } from 'react'

import { useContext } from 'react'
import ContextContactos from '../../context/Context'

const Detalle = () => {
  const { contactos, chatActivo, enviarMensaje } = useContext(ContextContactos);
  const [input, setInput] = useState("");

  const chat = contactos.find(c => c.id === chatActivo);

  if (!chat) return <p>Selecciona un chat</p>;

  return (
    <div className='flex flex-col bg-blue-950 p-4 h-full'>
      <h2 className='text-lime-400 font-bold'>{chat.nombre}</h2>

      <div className='flex-1 overflow-y-auto mb-4 bg-gray-900 p-2 rounded'>
        {chat.mensajes.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.autor === "user" ? "right" : "left"
            }}
          >
            {msg.texto}
          </div>
        ))}
      </div>

      <input className='bg-green-50 text-black p-2 mb-2'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button className='hover:bg-black' onClick={() => {
        enviarMensaje(input);
        setInput("");
      }}>
        Enviar
      </button>
    </div>
  );
};
export default Detalle