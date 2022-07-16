import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Alerta from '../components/Alerta'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useState } from 'react'

const LoginForm = ({ registro, setRegistro }) => {
    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('team')))
    console.log(usuario)
    const navegar = useNavigate()
    const validateYupSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email no valido')
            .required('Email Es obligatorio'),
        password: Yup.string()
            .required('Password obligatorio')
    })

    const HandleLogin = (values) => {
        let Usuarios
        if (localStorage.getItem('usuarios')) {
            Usuarios = localStorage.getItem('usuarios')
            Usuarios = JSON.parse(Usuarios)
        } else {
            Usuarios = []
        }
        const arregloLogin = Usuarios.filter(usuarios => usuarios.email == values.email)
        console.log(arregloLogin)
        if (arregloLogin.length > 0) {
            const usuarioConfirmar = arregloLogin[0]
            if (usuarioConfirmar.email == values.email) {
                if (usuarioConfirmar.password == values.password) {
                    Swal.fire({
                        title: "Bien echo!",
                        text: "Ahora podras disfrutar de nuestro contenido!",
                        icon: "success",
                    });
                    if(usuario == null){
                        navegar('/usuario')
                    } else{
                        navegar('/layout')
                    }
                    
                }else{
                    alert("Verifique su clave")
                }
            } else {
                alert("Por favor verifique su correo")
            }
        } else {
            alert('Usuario no Registrado, verifique los datos haga el favor')
        }
    }
    const HandleRegistro = (values) => {
        let Usuarios
        if (localStorage.getItem('usuarios')) {
            Usuarios = localStorage.getItem('usuarios')
            Usuarios = JSON.parse(Usuarios)
        } else {
            Usuarios = []
        }
        const arregloLogin = Usuarios.filter(usuarios => usuarios.email == values.email)
        console.log(arregloLogin)
        if (arregloLogin.length > 0) {
            alert('Usuario ya registrado')
        } else {
            Usuarios.push(values)
            localStorage.setItem('usuarios', JSON.stringify(Usuarios))
        }
        setRegistro(false)
    }

    const RegistroYLogin = values => {
        if (registro == true) {
            HandleRegistro(values)
            console.log('Enviando datos al registro')
        } else {
            HandleLogin(values)
            console.log('Enviando datos al login')
        }
    }
    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            onSubmit={(values, { resetForm }) => {
                RegistroYLogin(values)
                resetForm()
            }}
            validationSchema={validateYupSchema}
        >

            {({ errors, touched }) => {
                return (
                    <div className="bg-gray-200 mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                        {registro == true ? (
                            <div className="text-center my-4 bg-red-600 sm:w-full  md:w-1/2 lg:w-1/2 text-white font-bold p-3 uppercase">
                                Recuerda Anotar tu contraseña, para el Registro </div>) : null}
                        <Form >
                            <label htmlFor="email" className="text-gray-800">Correo</label>
                            <Field
                                id="email"
                                className="mt-2 block w-full p-3 bg-gray-100 "
                                type="email"
                                placeholder="ej jsebg.ruedat@gmail.com"
                                name="email"
                            />
                            {errors.email && touched.email ? <Alerta>{errors.email}</Alerta> : null}
                            <label htmlFor="password" className="text-gray-800">Contraseña</label>
                            <Field
                                type="password"
                                className="mt-2 block w-full p-3 bg-gray-100 "
                                id="password"
                                name="password"
                            />
                            {errors.password && touched.password ? <Alerta>{errors.password}</Alerta> : null}
                            <input type="submit" value={registro == true ? "Registrarse" : "Iniciar Sesion"} className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg" />
                        </Form>
                    </div>
                )
            }}

        </Formik>
    )
}

export default LoginForm