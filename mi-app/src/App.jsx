import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Componentes/Home'
import { Provider } from './context/Context';
import Detalle from './Componentes/Detalle/Detalle';
import './App.css'
import Navbar from './Componentes/Navbar/Navbar';
import Footer from './Componentes/Footer/Footer';

function App() {
  

  return (
    <><BrowserRouter>
      <Provider> 
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
        
          <Route path='/detalle/:id' element={<Detalle />} />
        </Routes>
      
      <Footer />
      </Provider>
      </BrowserRouter>
    </>
  )
}

export default App
