
import Forms from '../Form/Forms'
import { useContext } from 'react'
import ContextContactos from '../../context/Context'

const Contactos = () => {
   const { obtener, contactos, setChatActivo } = useContext(ContextContactos)

  
  
    return (
        <div className='flex flex-col items-center m-2 p-2'>Agregar Chat
            <Forms obtener={obtener} />
            
           {contactos.map((contacto) => (
  <div 
    key={contacto.id} 
    onClick={() => setChatActivo(contacto.id)} 
    className='flex flex-col items-center cursor-pointer bg-gray-900 p-2 rounded mb-2 w-full text-center hover:bg-black'
  >
    <h2>{contacto.nombre}</h2>
    <span style={{ color: contacto.estado === 'online' ? 'green' : 'gray' }}>
      {contacto.estado}
    </span>
  </div>
))}
    </div>
  )
}

export default Contactos