import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Componentes/Home'
import './App.css'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
    <Route path='/' element={<Home/>} />
        </Routes>
      
      </BrowserRouter>
      <div>
        </div>
    </>
  )
}

export default App
