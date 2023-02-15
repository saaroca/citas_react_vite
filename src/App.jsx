import { useState, useEffect } from "react"
import Formulario from "./components/formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {

  const[pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})

  useEffect(() => {
    const obtenerLS = () =>{
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? []
      setPacientes(pacientesLS)
    }

    obtenerLS()
  }, [])

  useEffect(() =>{
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])

  //filtra por todos los pacientes que no tengan el ID igual al seleccionado y actualiza la lista con el setPacientes
  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id)
    setPacientes(pacientesActualizados)
  }
  return (
   <div className="container mx-auto mt-20">
   <Header />
    <div className="mt-12 md:flex">
      <Formulario 
      //Props 
        setPacientes={setPacientes}
        pacientes={pacientes}
        paciente={paciente}
      />
      <ListadoPacientes 
        pacientes={pacientes}
        setPaciente={setPaciente}
        eliminarPaciente={eliminarPaciente}
      />
    </div>
   </div>
  )
}

export default App

