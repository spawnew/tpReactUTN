
import { useState } from 'react'
const Forms = ({obtener}) => {
      const [form, setForm] = useState({ nombre: "",id: "" })
    const handleChange = (e) =>
    
        setForm({
            ...form,
            [e.target.name]: e.target.value,
                id: Date.now()
        })
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form)
        obtener(form)
        setForm({ nombre: "", id: "" })
    }
    return (
        <div>






            <form onSubmit={handleSubmit}>
                <input className='p-1 bg-blue-950 rounded-xl' type="text" onChange={handleChange} name="nombre" value={form.nombre} placeholder='ingrese su nombre'>
                </input>
               

                <input type="submit" ></input>

            </form>


        </div>
    )
}


export default Forms