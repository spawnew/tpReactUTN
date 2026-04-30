import React from 'react'
import Contactos from './Contactos/Contactos'
import Detalle from './Detalle/Detalle'
import { useContext } from 'react'
import ContextContactos from '../context/Context'
const Home = () => {
  const { chatActivo } = useContext(ContextContactos);

  return (
    <div className="grid grid-cols-5 h-screen overflow-hidden">
      <div className="col-span-2 bg-gray-900 border-r border-gray-700 overflow-y-auto">
        <Contactos />
      </div>
      <div className="col-span-3 bg-gray-900">
        {chatActivo ? <Detalle /> : (
          <div className="flex h-full items-center justify-center text-gray-500">
            Selecciona un contacto para iniciar el chat
          </div>
        )}
      </div>
    </div>
  );
};
export default Home