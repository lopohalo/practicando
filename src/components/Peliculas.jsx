import React from 'react'

const Peliculas = ({ peliculas,listaDePeliculas,verificar,eliminando,generador }) => {
    console.log(peliculas)
    const agregar = id => {
        listaDePeliculas(id)
    }
    const eliminar = id => {
        eliminando(id)
    }
    return (
        // src={`https://image.tmdb.org/t/p/w500/${peliculas.poster_path}`}

<div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img className="rounded-t-lg" src={`https://image.tmdb.org/t/p/w500/${peliculas.poster_path}`} alt="" />
    </a>
    <div className="p-5 flex flex-row justify-between">

        <a href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Leer más
            <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </a>
        {generador == 'boton' ? (<button className="bg-green-900 rounded mx-2 my-2 w-full" onClick={() => agregar(peliculas.id)}>Agregar</button>) : null}
        {verificar == false ? (<img className="w-7" onClick={() => agregar(peliculas.id) } src="src/img/plus-solid.svg" alt="" />) : (<button className="bg-red-900 rounded py-1 px-1 " onClick={() => eliminar(peliculas.id)}>Eliminar</button>)}
        
    </div>
</div>

    )
}


export default Peliculas