import  { useState } from 'react'
import Forms from '../Form/Forms'
const Contactos = () => {
const [contactos, setContactos] =useState([])
const obtener = (data) => {
    console.log(data)
    setContactos([...contactos, data])
}
  
  
    return (
        <div>Contactos
            <Forms obtener={obtener} />
            
            {contactos.map((contacto) => {
                return (
                    <div key={contacto.id}>
                        <h2>{contacto.nombre}</h2>
                        <button>ir</button>
                    </div>
                )
            })}
    </div>
  )
}

export default Contactos