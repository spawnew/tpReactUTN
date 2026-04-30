
import { useState } from 'react'
const Forms = ({ obtener }) => {
  const [form, setForm] = useState({ nombre: "", id: "",mail:"" });

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      id: Date.now()
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) return;
    obtener(form);
    setForm({ nombre: "", id: "",mail:"" });
  };

  return (
    <div className="w-full">
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row  items-center gap-2 bg-gray-900 p-2 rounded-xl shadow-md"
      >
       
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nuevo chat..."
          className="flex-1 p-2 rounded-lg bg-gray-800 text-white 
                     placeholder-gray-400 outline-none 
                     focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="mail"
          value={form.mail}
          onChange={handleChange}
          placeholder="Correo electrónico..."
          className="flex-1 p-2 rounded-lg bg-gray-800 text-white 
                     placeholder-gray-400 outline-none 
                     focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white 
                     font-medium hover:bg-blue-700 
                     active:scale-95 transition"
        >
          +
        </button>
      </form>
    </div>
  );
};

export default Forms;

