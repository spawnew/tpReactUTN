
import Forms from '../Form/Forms'
import { useContext } from 'react'
import ContextContactos from '../../context/Context'

const Contactos = () => {
   const { obtener, contactos, setChatActivo } = useContext(ContextContactos)

  
  
    return (
        <div className='flex flex-col items-center'>Agregar Chat
            <Forms obtener={obtener} />
            
           {contactos.map((contacto) => (
  <div 
    key={contacto.id} 
    onClick={() => setChatActivo(contacto.id)} // Seteamos el chat activo aquí
    style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #444' }}
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