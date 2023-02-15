
/*hook useEffect --> es un callback, se ejecuta cuando un state cambia o cuando el componente esta listo
se ejecuta automaticamente cuando el componente esta listo, 
excelente lugar para poner código para consultar API o LocalStorage
Le podemos pasar una dependencia y esta escuchando por los cambios que sucedan en una variable, 
puede actualizar el componente cuando suceda el cambio*/

import {React, useState, useEffect} from 'react'
import Error from './Error'
const Formulario = ({pacientes, setPacientes, paciente}) => {
  
  //Hook para cada campo del formulario
  const [nombre, setNombre] = useState('')
  const [propietario, setPropetario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')
  
  const [error, setError] = useState(false)

  //Detecta que paciente no está vacío y modifica el status con los datos del objeto
  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropetario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    } 
  }, [paciente])

  useEffect(() => {
    console.log('El componente esta listo')
  },[])

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    //Validación del formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')){
        console.log('Hay campos vacios')
        setError(true)
          return
    } 
    setError(false)
    //Objeto de Paciente
    const ObjetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
      id: generarId()
    }
    
    if(paciente.id) {
      //Editando registro
      ObjetoPaciente.id = paciente.id

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? ObjetoPaciente : pacienteState)

      setPacientes(pacientesActualizados)
    } else{
      //Nuevo Registro
      ObjetoPaciente.id = generarId()
      //Con ...pacientes creamos una array nueva de pacientes a partir de la original y le añadimos el objeto paciente
      setPacientes([...pacientes, ObjetoPaciente])
    }
    

    //Reiniciar el form
    setNombre('')
    setPropetario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>

        <p className='text-lg mt.5 text-center mb-10'>
          Añade Pacientes y {''}
          <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form 
          onSubmit={handleSubmit}
          className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
        >
          
          { error && <Error> Todos los campos son obligatorios </Error>}
          <div className='mb-5'>
            <label htmlFor='mascota' className='block text-gray-700 uppercase font-bold'>
              Nombre Mascota
            </label>
            <input type="text"
                  id="mascota"
                  placeholder='Nombre de la Mascota'
                  className='border-2 w-full p-2 mt-2 placeholder-slate-400 rounded-md'
                  value={nombre}
                  //evento que se activa cada vez que añadimos una letra al input
                  onChange={ (e) => setNombre(e.target.value) }
              />
          </div>

          <div className='mb-5'>
            <label htmlFor='propietario' className='block text-gray-700 uppercase font-bold'>
              Nombre Propietario
            </label>
            <input type="text"
                  id="propietario"
                  placeholder='Nombre del Propietario'
                  className='border-2 w-full p-2 mt-2 placeholder-slate-400 rounded-md'
                  value={propietario}
                  onChange={ (e) => setPropetario(e.target.value) }
            />
          </div>

          <div className='mb-5'>
            <label htmlFor='email' className='block text-gray-700 uppercase font-bold'>
              Email
            </label>
            <input type="email"
                  id="email"
                  placeholder='Email contacto propietario'
                  className='border-2 w-full p-2 mt-2 placeholder-slate-400 rounded-md'
                  value={email}
                  onChange={ (e) => setEmail(e.target.value) }
            />
          </div>

          <div className='mb-5'>
            <label htmlFor='alta' className='block text-gray-700 uppercase font-bold'>
              Alta
            </label>
            <input type="date"
                  id="alta"
                  className='border-2 w-full p-2 mt-2 placeholder-slate-400 rounded-md'
                  value={fecha}
                  onChange={ (e) => setFecha(e.target.value) }
              />
          </div>

          <div className='mb-5'>
            <label htmlFor='sintomas' className='block text-gray-700 uppercase font-bold'>
              Síntomas
            </label>
            <textarea 
              id="sintomas"
              placeholder='Describe los síntomas'
              className='border-2 w-full p-2 mt-2 placeholder-slate-400 rounded-md'
              value={sintomas}
                  onChange={ (e) => setSintomas(e.target.value) }
              />
          </div>

          <input
            type="submit"
            className='bg-indigo-600 w-full p-3 rounded-md text-white font-bold uppercase hover:bg-indigo-700 cursor-pointer transition-all'
            value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} />
        </form>
    </div>
  )
}

export default Formulario
