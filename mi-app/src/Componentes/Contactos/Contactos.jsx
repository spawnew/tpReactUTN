import Forms from '../Form/Forms';
import FormUsuario from '../FormUsuario/FormUsuario';
import { useContext } from 'react';
import ContextContactos from '../../context/Context';

const Contactos = () => {
    const { 
        obtener, 
        contactos, 
        setChatActivo, 
        chatActivo, 
        eliminarChat, 
        usuarios, 
        usuarioActualId, 
        setUsuarioActualId 
    } = useContext(ContextContactos);

    return (
        <div className='flex flex-col h-full p-4 bg-gray-900 border-r border-gray-800 overflow-y-auto text-white'>
            
          
            <div className="mb-4 pb-4 border-b border-gray-800">
                <h2 className='text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider'>1. Tus Usuarios</h2>
                
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {usuarios.map(u => (
                        <button
                            key={u._id}
                            onClick={() => setUsuarioActualId(u._id)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                                usuarioActualId === u._id 
                                    ? 'bg-green-600 text-white shadow' 
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                        >
                            👤 {u.nombre}
                        </button>
                    ))}
                </div>

                <FormUsuario />
            </div>

         
            <div className="mb-4 pb-4 border-b border-gray-800">
                <h2 className='text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider'>2. Crear Chat</h2>
                <Forms obtener={obtener} />
            </div>

         
            <h2 className='text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider'>Conversaciones</h2>
            <div className='flex-1 space-y-2 mt-1'>
                {contactos.map((contacto) => (
                    <div 
                        key={contacto._id} 
                        onClick={() => setChatActivo(contacto._id)} 
                        className={`flex justify-between items-center p-3 rounded-xl cursor-pointer transition-all border ${
                            chatActivo === contacto._id 
                                ? 'bg-blue-600/20 border-blue-500 text-white shadow-md' 
                                : 'bg-gray-800/60 border-gray-700/50 text-gray-300 hover:bg-gray-800 hover:border-gray-600'
                        }`}
                    >
                        <div className="overflow-hidden mr-2">
                            <span className='font-semibold text-sm block truncate'>{contacto.nombre}</span>
                            <span className='text-xs text-gray-400 mt-0.5 block'>
                                {contacto.participantes?.length || 0} participantes
                            </span>
                        </div>

                      
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                eliminarChat(contacto._id);
                            }}
                            className='text-gray-400 hover:text-red-400 p-2 rounded-lg transition hover:bg-gray-700/50 text-sm'
                            title="Eliminar conversación"
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Contactos;