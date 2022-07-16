import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import '../styles/layout.css'
const Layout = ({setGeneros}) => {
    const [usuario, setusuario] = useState(JSON.parse(localStorage.getItem('team')))
    const ubicacion = useLocation()
    const urlActual = ubicacion.pathname
    return (
        <div className="md:flex md:min-h-screen bg-red-700">
            <div className="md:w-1/4 bg-yellow-400 px-5 py-10">
                <h2 className="text-black text-center font-black text-4xl">Pelis JMR</h2>
                <h1 className="text-black text-center font-bold mt-10">Hola {usuario.nombre}, Como estas?</h1>
                <div className="shrink-0 mt-5 mb-5">
                                        <img className="h-1/2 w-3/4 object-cover rounded-full m-auto" src={usuario.foto} alt="Current profile photo" />
                                    </div>
                <nav className="mt-10">
                    <Link className={`${urlActual === '/layout' ? 'text-black text-xl ': "text-white block text-2xl mt-2 hover:text-blue-300"} `} to="/layout">Inicio</Link>
                    <Link className={`${urlActual === '/layout/lista' ? 'text-black text-xl ' : "text-white block text-2xl mt-2 hover:text-blue-300"} `} to="/layout/lista" >Tu lista</Link>
                    <Link className="text-white block text-2xl mt-2 hover:text-blue-300" onClick={() => {setGeneros('terror')}} to="/layout/generos" >Terror</Link>
                    <Link className="text-white block text-2xl mt-2 hover:text-blue-300" onClick={() => {setGeneros('Accion')}} to="/layout/generos" >Accion</Link>
                    <Link className="text-white block text-2xl mt-2 hover:text-blue-300" onClick={() => {setGeneros('Aventura')}} to="/layout/generos" >Aventura</Link>
                    <Link className="text-white block text-2xl mt-2 hover:text-blue-300" onClick={() => {setGeneros('Animacion')}} to="/layout/generos" >Animacion</Link>
                    <Link className="text-white block text-2xl mt-2 hover:text-blue-300" onClick={() => {setGeneros('Comedia')}} to="/layout/generos" >Comedia</Link>
                    <Link className="text-white block text-2xl mt-2 hover:text-blue-300" onClick={() => {setGeneros('Fantasia')}} to="/layout/generos" >Fantasia</Link>
                </nav>
            </div>
            <div className="md:w-screen p-10 md:h-screen overflow-scroll fondo">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout