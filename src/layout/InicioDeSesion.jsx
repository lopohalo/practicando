import { useState } from 'react'
import LoginForm from '../paginas/LoginForm'

const InicioDeSesion = () => {
const [registro, setRegistro] = useState(false)

    return (
        <>
        {registro == true ? (
            <>
            <div className="text-center mt-7">
            <h1 className="font-black text-4xl text-blue-900">registrate</h1>
            <p className="mt-3">Registrate para disfrutar de nuestra pagina</p>
        </div>
        </>
        ): (
            <>
            <div className="text-center mt-7">
            <h1 className="font-black text-4xl text-blue-900">Inicia Sesion</h1>
            <p className="mt-3">Registrate para disfrutar de nuestra pagina</p>
        </div>
        </>
        )}
                <LoginForm 
                    registro={registro}
                    setRegistro={setRegistro}
                />
            <div className="text-center mt-6">
                <p>{registro == true ? "Ya tienes una Cuenta?": "Aun no tienes cuenta?"}
                </p>
                <input type="submit" onClick={() => {setRegistro(!registro)}} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    value={registro == true ? "Login": "Registrese"}
                />
            </div>
        </>


    )
}

export default InicioDeSesion