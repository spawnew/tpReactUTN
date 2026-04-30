import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Componentes/Home'
import { Provider } from './context/Context';
import Detalle from './Componentes/Detalle/Detalle';
import './App.css'

function App() {
  

  return (
    <><BrowserRouter>
      <Provider> 
      
        <Routes>
          <Route path='/' element={<Home />} />
        
          <Route path='/detalle/:id' element={<Detalle />} />
        </Routes>
      
      
      </Provider>
      </BrowserRouter>
    </>
  )
}

export default App
