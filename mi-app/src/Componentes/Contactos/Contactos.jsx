
import Forms from '../Form/Forms'
import { useContext } from 'react'
import ContextContactos from '../../context/Context'
import { Link } from 'react-router-dom'
const Contactos = () => {
   const { obtener, contactos } = useContext(ContextContactos)


  
  
    return (
        <div>Contactos
            <Forms obtener={obtener} />
            
            {contactos.map((contacto) => {
                return (
                    <div key={contacto.id}>
                        <Link to={`/detalle/${contacto.id}`}>
                            <h2>{contacto.nombre}</h2>
                        </Link>
                       
                    </div>
                )
            })}
    </div>
  )
}

export default Contactos