import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Generos from './components/Generos'
import Usuario from './components/Usuario'
import InicioDeSesion from './layout/InicioDeSesion'
import Layout from './layout/Layout'
import Inicio from './paginas/Inicio'
import Lista from './paginas/Lista'

function App() {
  const [ generos, setGeneros] = useState(null)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioDeSesion />}></Route>
        <Route path="usuario" element={<Usuario/>} />
        <Route path="layout" element={<Layout 
        setGeneros={setGeneros}
        />}>
          <Route index element={<Inicio />} />
          <Route path="lista" element={<Lista/>} />
          <Route path="generos" element={<Generos
          generos={generos}
          />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
