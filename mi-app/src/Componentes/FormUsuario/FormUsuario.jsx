import { useState, useContext } from 'react';
import ContextContactos from '../../context/Context';

const FormUsuario = () => {
  const { crearUsuario } = useContext(ContextContactos);
  const [form, setForm] = useState({ nombre: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.email.trim()) return;

    await crearUsuario(form);
    setForm({ nombre: "", email: "" }); 
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre de usuario..."
        className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-white outline-none text-xs"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email..."
        className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-white outline-none text-xs"
      />
      <button
        type="submit"
        className="py-1.5 bg-green-600 hover:bg-green-500 rounded-lg font-medium text-xs text-white transition"
      >
        Crear Usuario
      </button>
    </form>
  );
};

export default FormUsuario;