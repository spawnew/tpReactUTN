import { useState } from 'react';

const Forms = ({ obtener }) => {
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    obtener({ nombre });
    setNombre("");
  };

  return (
    <div className="w-full mb-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del nuevo chat..."
          className="flex-1 p-2.5 rounded-xl bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 text-sm border border-gray-700"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 active:scale-95 transition shadow-lg"
        >
          +
        </button>
      </form>
    </div>
  );
};

export default Forms;

