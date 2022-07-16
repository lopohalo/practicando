import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Swal from 'sweetalert2'


const Usuario = () => {
    const [usuario, setUsuario ] = useState({})
    const {foto} = usuario
    const navegar = useNavigate()
    const validateYupSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, 'El nombre es muy corto')
            .max(10, 'El nombre es muy largo')
            .required('El nombre es obligatorio'),
    })
    const onsubmit1 = values => {
        setUsuario(values)
        localStorage.setItem('team', JSON.stringify(values))
        Swal.fire({
            title: "Bien echo!",
            text: "Ahora podras seguir disfrutando de nuestro contenido!",
            icon: "success",
        });
        setTimeout(() => {
            navegar('/layout')
        }, 1500);
    }
    return (
        <div className="bg-slate-200 h-screen py-20">
            <div className="text-center">
                <h2 className="text-black text-center font-black text-4xl">Pelis JMR</h2>
                <h1 className="text-center my-2  text-black font-bold p-2 uppercase">
                    Crear  usuario</h1>
                <div className="mt-10 text-center flex-col  justify-center">
                    <div className=""><img src="src/img/usuario.png" className="w-16 m-auto mb-8" alt="logo"/></div>
                    <Formik className="flex items-center space-x-6 justify-center text-center"
                        initialValues={{
                            nombre: '',
                            foto: '',
                        }}
                        onSubmit={(values, { resetForm }) => {
                            onsubmit1(values)
                            resetForm()
                        }}
                        validationSchema={validateYupSchema}
                    >
                        {({ errors, touched }) => {
                            return (
                                <Form>
                                <div className="flex-col flex mb-10 items-center">
                                    <label htmlFor="nombre">Nombre</label>
                                    <Field type="text" className="rounded py-2 px-2 sm:w-1/2 md:w-1/5 lg:1/5 m-auto " id="nombre" placeholder="ej Juan" name="nombre" />
                                    {touched.nombre && errors.nombre ? <Alerta>{errors.nombre}</Alerta> : null}
                                    <div className="shrink-0 mt-5 mb-5">
                                        <img className="h-16 w-16 object-cover rounded-full m-auto" src={foto ? foto : 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80'} alt="Current profile photo" />
                                    </div>
                                    <label className="block">
                                        <span className="sr-only">Choose profile photo</span>
                                        <Field type="text" placeholder="Coloca la url de una imagen" className="py-2 rounded px-2" name="foto" />
                                    </label>
                                    <input type="submit" value="Continuar" className="m-auto mt-5 sm:w-1/2 md:w-1/5 lg:1/5 bg-blue-800 p-3 text-white uppercase font-bold text-lg" />
                                </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Usuario