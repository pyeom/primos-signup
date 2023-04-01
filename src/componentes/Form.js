import React from 'react'
import {useState} from 'react'
import './Form.css'

export const Form = () => {
  const [name, set_name] = useState('')
  const [rol, set_rol] = useState('')
  const [error1, set_error1] = useState(false)

  const handle_rol = event => {
    let value = event.target.value.slice(0, 11).toLowerCase()
    let usm_id = value.slice(0, 9)

    if (isNaN(usm_id)) return
    if (value.length > 9) {
      if (value[9] !== '-') value = usm_id + '-' + value.slice(9)
      if (value.length > 10 && isNaN(value[10]) && value[10] !== 'k') return
    }
    set_rol(value)
  }

  const rol_verification = _ => {
    if (rol.length !== 11) {
      set_error1(true)
    } else {
      set_error1(false)
    }
    let formatted_rol = rol.slice(0, 9) + (rol[10] === 'k' ? 0 : rol[10])
    console.log(formatted_rol)
  }

  return (
    <div className='Form gapped'>
      <h1>
        <b>Ingrese sus datos</b>
      </h1>
      <div className='gapped'>
        <div>
          <input
            type='text'
            className='input_field'
            placeholder='123456789-k'
            onChange={handle_rol}
            onBlur={rol_verification}
            value={rol}
          />
          <label for="" class="input_label">
          <b>Rol</b>
          </label>
        </div>
        {error1 && <div className='error'>Rol Inválido</div>}
      <div className='gapped'>
          <input
            type='text'
            className='input_field'
            placeholder='Luis Apellido'
            onChange={event => set_name(event.target.value)}
            value={name}
          />
          <label className='input_label'>
            <b>Nombre completo</b>
          </label>
        </div>
      </div>
      <div className='gapped'>
        <div>
          <input
            type='text'
            className='input_field'
            placeholder='Lucho'
            defaultValue={name.split(' ')[0]}
          />
          <label className='input_label'>
            <b>Apodo</b>
          </label>
        </div>
      </div>
      <div className='error'>
        <u>Nota</u>: Elige un apodo fácilmente identificable por todos tus compañeros; tu primer,
        segundo, ámbos nombres o tu nombre social son una buena opción.&ensp;
        <b>Evita usar tu Gamer Tag</b> o cualquier apodo que sea difícil de relacionar contigo para
        alguien que no te conoce de primera mano.
        <br />
        <br />
        <div className='examples'>
          <div>
            Felipe → Pipe ✔️
            <br />
            Felipe → pyeom ❌
          </div>
          <div>
            Vicente Mackenzie → Makenki ✔️
            <br />
            Vicente Mackenzie → 3122 ❌
          </div>
        </div>
      </div>
    </div>
  )
}
