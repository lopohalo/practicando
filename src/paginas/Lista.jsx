import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Peliculas from '../components/Peliculas'

const Lista = () => {
    const [peliculas, setLista] = useState(JSON.parse(localStorage.getItem('peliculas')) ?? [])
    const [verificar, setVerificar] = useState(true)
    const navegar = useNavigate()
    const eliminando = id => {
        let nuevoArreglo = peliculas.filter(pelicula => pelicula.id != id)
        localStorage.setItem('peliculas', JSON.stringify(nuevoArreglo))
        setLista(nuevoArreglo)
        
    }
    return (
        <>
            {peliculas.length == 0 ? (
                <>
                    <h2 className="font-black text-3xl text-start ">Puedes comenzar Agregando<br />
                        <span className="text-indigo-600 font-bold">Peliculas a tu lista</span>
                    </h2>

                    <button className="btn text-primary bg-red-700 rounded py-2 px-2" onClick={() => { navegar('/layout') }}>Ve Al inicio</button>
                </>
            )
                : (
                    <h2 className="font-black text-5xl text-start mb-6">Sigue explorando <br /><span className="text-red-700 font-bold">administra tu lista</span></h2>)}
            <div className="grid sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 gap-4 ">
                {peliculas.map(pelicula => (
                    <Peliculas
                        key={pelicula.id}
                        peliculas={pelicula}
                        verificar={verificar}
                        eliminando={eliminando}
                    />
                ))}
            </div>
        </>

    )
}

export default Lista