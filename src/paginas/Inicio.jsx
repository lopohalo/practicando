import React, { cloneElement, useEffect, useState } from 'react'
import Peliculas from '../components/Peliculas'
import Swal from 'sweetalert2'
import '../styles/layout.css'

const Inicio = () => {
  const [peliculas, setPeliculas] = useState([])
  const [nombre1, guardarnombre] = useState({
    nombre: ''
  });
  const [informacion, setInformacion] = useState(null)
  const [contador, setContador] = useState(1)
  let verificar = false
  useEffect(() => {
    const consultar = async () => {
      try {
        const consultando = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=a21a16078ca404bf4861a456f799b7cd&language=es&page=${contador}`)
        const respuesta = await consultando.json()
        setInformacion(respuesta.total_pages)
        setPeliculas(respuesta.results)
        
      } catch (error) {
        console.log(error)
      }
    }
    consultar()
  }, [contador])

  const aumentar = () => { 
        if(contador !== 69){
          setContador(contador + 1)
          console.log(contador)
        }
  }

  const decrementar = () => {
    if(contador !== 1){
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
  // extraer de usuario
  const { nombre } = nombre1;

  const onChange = e => {
    guardarnombre({
      ...nombre1,
      [e.target.name]: e.target.value
    })
  }
  const onSubmit = async (e) => {
    e.preventDefault();

    // Validar que no haya campos vacios
    if (nombre.trim() === '') {
      alert('Por favor colocar un valor')
    }
    try {
      const consultando = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=a21a16078ca404bf4861a456f799b7cd&language=es&query=${nombre}`)
      const respuesta = await consultando.json()
      setPeliculas(respuesta.results)
      console.log(peliculas)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="md:w-1/2 lg:w-auto md:h-screen overflow-y-scroll">
      <>
        <div className="mb-4 mx-3 media">
          {peliculas.length == 0 ? (<><h2 className="font-black text-3xl text-start">ERROR 404<br /><span className="text-indigo-600 font-bold">No se encontro pelicula</span></h2> <button className="btn text-primary bg-red-700 rounded py-2 px-2 mt-4 mb-3" onClick={() => { navegar('/layout') }}>ATRAS</button></>) : (<><h2 className="font-black text-5xl text-start">Conoce las ultimas peliculas <br /><span className="text-red-700 font-bold">agregalas a tu lista</span></h2></>)}
          <form onSubmit={onSubmit} className="sm:w-full lg:w-1/2 mt-4">
            <label htmlFor="nombre" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="text" id="nombre" name="nombre" value={nombre} onChange={onChange} className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Busca una pelicula" required="" />
              <button type="submit" className="text-black absolute right-2.5 bottom-2.5 bg-yellow-400 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Buscar</button>
            </div>
          </form>
        </div>
        <div className="grid sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 gap-4 ">
          {peliculas.map(pelicula => (
            <Peliculas
              key={pelicula.id}
              peliculas={pelicula}
              listaDePeliculas={listaDePeliculas}
              verificar={verificar}
            />
          ))}
        </div>
      </>
      <div className="text-center ">
      <div className="flex flex-col items-center">
  <span className="text-sm text-gray-700 dark:text-gray-400">
      Mostrando <span className="font-semibold text-gray-900 dark:text-white">{contador}</span>  <span className="font-semibold text-gray-900 dark:text-white"></span> Pagina de <span className="font-semibold text-gray-900 dark:text-white">{informacion}</span> 
  </span>
  <div className="inline-flex mt-2 xs:mt-0">
      {contador !== 1 ? (<button onClick={() => {decrementar()}} className="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Anterior
      </button>) : null }
      {contador !==69 ? (<button onClick={() => {aumentar()}} className="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Siguiente
      </button>) : null}
  </div>
</div>
      </div>
    </div>
  )
}

export default Inicio
// a21a16078ca404bf4861a456f799b7cd
// para buscar cosas y aparezcan mas peliculas de esa referencia
// https://api.themoviedb.org/3/search/movie?api_key=a21a16078ca404bf4861a456f799b7cd&language=es&query=batman
// para el inicio de varias peliculas mezcladas 
// https://api.themoviedb.org/3/movie/now_playing?api_key=a21a16078ca404bf4861a456f799b7cd&language=es&page=1
// peliculas mas vistas
// https://api.themoviedb.org/3/trending/all/day?api_key=a21a16078ca404bf4861a456f799b7cd&language=es&page=1
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjFhMTYwNzhjYTQwNGJmNDg2MWE0NTZmNzk5YjdjZCIsInN1YiI6IjYyY2E2ZjE3NTk1YTU2MTJiOTEwMDAwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GSlP6ZNVPNsTBe4pnHQY74zg4dco0apHjGOhhoQzz9Y