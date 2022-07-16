import React, { useEffect, useState } from 'react'
import Peliculas from './Peliculas'
import Swal from 'sweetalert2'

const Generos = ({ generos }) => {
    const [peliculas, setPeliculas] = useState([])
    const [informacion, setInformacion] = useState(null)
    const verificar = false
    let generador = 'boton'
    const [contador, setContador] = useState(1)
    useEffect(() => {
        const consultar = async () => {
            try {
                const consultando = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a21a16078ca404bf4861a456f799b7cd&language=es&query=${generos}&page=${contador}`)
                const respuesta = await consultando.json()
                setInformacion(respuesta.total_pages)
                setPeliculas(respuesta.results)
            } catch (error) {
                console.log(error)
            }
        }
        consultar()
    }, [generos, contador])
    const aumentar = () => {
        if (contador !== informacion) {
            setContador(contador + 1)
            console.log(contador)
        }
    }

    const decrementar = () => {
        if (contador !== 1) {
            setContador(contador - 1)
            console.log(contador)
        }
    }
    const listaDePeliculas = id => {
        let Peliculas
        if (localStorage.getItem('peliculas')) {
            Peliculas = localStorage.getItem('peliculas')
            Peliculas = JSON.parse(Peliculas)
        } else {
            Peliculas = []
        }



        const arreglo = peliculas.filter(pelicula => pelicula.id == id)
        const verificarLaSitua = Peliculas.filter(pelicula => pelicula.id == arreglo[0].id)
        if (verificarLaSitua.length > 0) {
            alert('Esta pelicula ya esta en tu lista')
        } else {
            Peliculas.push(arreglo[0])
            localStorage.setItem('peliculas', JSON.stringify(Peliculas))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ha agregado Correctamente a tu lista',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    return (
        <>
            <div className="grid sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 gap-4 ">
                {peliculas.map(pelicula => (
                    <Peliculas
                        key={pelicula.id}
                        peliculas={pelicula}
                        verificar={verificar}
                        generador={generador}
                        listaDePeliculas={listaDePeliculas}
                    />
                ))}
            </div>
            <div className="text-center ">
                <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                        Mostrando <span className="font-semibold text-gray-900 dark:text-white">{contador}</span>  <span className="font-semibold text-gray-900 dark:text-white"></span> Pagina de <span className="font-semibold text-gray-900 dark:text-white">{informacion}</span>
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0">
                        {contador !== 1 ? (<button onClick={() => { decrementar() }} className="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Anterior
                        </button>) : null}
                        {contador !== 69 ? (<button onClick={() => { aumentar() }} className="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Siguiente
                        </button>) : null}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Generos