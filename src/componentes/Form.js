import React from 'react'
import {useState} from 'react';

export const Form = () => {
  const [name, set_name] = useState('');
  const [rol, set_rol] = useState('');

  const handle_rol = event => {
    let value = event.target.value.slice(0, 11).toLowerCase()
    let usm_id = value.slice(0, 9)

    if (isNaN(usm_id))
      return
    if (value.length > 9) {
      if (value[9] != '-')
        value = usm_id + '-' + value.slice(9)
      if (value.length > 10 && isNaN(value[10]) && value[10] != 'k')
        return
    }
    set_rol(value)
  }

  const rol_verification = _ => {
    if (rol.length != 11) {
      // Hacer que te diga que está malo
      return
    }
    let formatted_rol = rol.slice(0, 9) + (rol[10] == 'k'? 0: rol[10])
    console.log(formatted_rol)
  }

  return (
    <div className='Form'>
      <br />
      <label>
        ROL: <input onChange={handle_rol} onBlur={rol_verification} value={rol}/>
      </label>
      <br />
      <label>
        Nombre Completo: <input onChange={event => set_name(event.target.value)} value={name}/>
      </label>
      <br />
      <label>
        Apodo: <input defaultValue={name.split(' ')[0]}/>
      </label>
      <div>
        <u>Nota</u>: Elije un apodo fácilmente identificable por todos tus compañeros;
        tu primer, segundo, ámbos nombres o tu nombre social son una buena opción, <b>evita usar tu Gamer Tag</b> o
        cualquier apodo que sea difícil de relacionar contigo para alguien que no te conoce de primera mano.
        <ul>
          <li>Felipe Rojas → Pipe ✔️</li>
          <li>Felipe Rojas → pyeom ❌</li>
          <li>Vicente Mackenzie → Makenki ✔️</li>
          <li>Vicente Mackenzie → E122 ❌</li>
        </ul>
      </div>
    </div>
  )
}