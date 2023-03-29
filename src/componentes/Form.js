import React from 'react'
import {useState} from 'react';
import './Form.css';

export const Form = () => {
  const [name, set_name] = useState('');
  const [rol, set_rol] = useState('');
  const [error1, set_error1] = useState(false);

  const handle_rol = event => {
    let value = event.target.value.slice(0, 11).toLowerCase()
    let usm_id = value.slice(0, 9)

    if (isNaN(usm_id))
      return
    if (value.length > 9) {
      if (value[9] !== '-')
        value = usm_id + '-' + value.slice(9)
      if (value.length > 10 && isNaN(value[10]) && value[10] !== 'k')
        return
    }
    set_rol(value)
  }

  const rol_verification = _ => {
    if (rol.length !== 11) {
      set_error1(true)
    }
    else{
      set_error1(false)
    }
    let formatted_rol = rol.slice(0, 9) + (rol[10] === 'k'? 0: rol[10])
    console.log(formatted_rol)
  }

  return (
    <div className='Form'>
      <br />
      <label>
        <b>ROL</b><br /><input placeholder="123456789-k" onChange={handle_rol} onBlur={rol_verification} value={rol}/>
        {error1 && (<div style={{color: '#e03434'}}>Rol Invalido</div>)}
      </label>
      <br />
      <label>
        <b>Nombre completo</b><br /><input placeholder="Luis Apellido" onChange={event => set_name(event.target.value)} value={name}/>
      </label>
      <br />
      <label>
        <b>Apodo</b><br /><input placeholder="Lucho" defaultValue={name.split(' ')[0]}/>
      </label>
      <div>
        <u>Nota</u>: Elige un apodo fácilmente identificable por todos tus compañeros;
        tu primer, segundo, ámbos nombres o tu nombre social son una buena opción, <b>evita usar tu Gamer Tag</b> o
        cualquier apodo que sea difícil de relacionar contigo para alguien que no te conoce de primera mano.
        <ul>
          <li>Felipe Rojas → Pipe ✔️</li>
          <li>Felipe Rojas → pyeom ❌</li>
          <li>Vicente Mackenzie → Makenki ✔️</li>
          <li>Vicente Mackenzie → 3122 ❌</li>
        </ul>
      </div>
    </div>
  )
}