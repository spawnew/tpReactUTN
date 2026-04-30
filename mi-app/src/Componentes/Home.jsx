import React from 'react'
import Contactos from './Contactos/Contactos'
import Detalle from './Detalle/Detalle'
const Home = () => {
  return (
    // Definimos 4 columnas. El h1 ocupará la primera por defecto.
    <div className="grid grid-cols-5 gap-4">
      
      <h1 className="col-3 text-2xl font-bold">Bienvenidos a mi sitio web</h1>
      
      <div className="col-2 bg-amber-100">
        <aside className="h-dvh bg-gray-600 p-4">
          <Contactos />
        </aside>
      </div>

      
      <div className=" col-span-2 bg-amber-900 p-4">
           <Detalle />
      </div>
      
    </div>
  )
}

export default Home