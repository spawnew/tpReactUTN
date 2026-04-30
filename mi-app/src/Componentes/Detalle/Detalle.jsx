import React from 'react'
import { useParams } from 'react-router'
import { useContext } from 'react'
import ContextContactos from '../../context/Context'
const Detalle = () => {
    const {  contactos } = useContext(ContextContactos)
    const { id } = useParams()
    console.log(contactos)
  
return (
  <>
    {contactos.filter((contacto) => contacto.id !== id) 
      .map((contacto) => (                     
        <div key={contacto.id}>
          <h2>{contacto.nombre}</h2>
        </div>
      ))}
  </>
)
}
export default Detalle