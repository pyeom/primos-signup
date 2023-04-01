import React from 'react'
import {useState} from 'react'
import './Form.css'

export const Form = ({fullname}) => {
  const [name, set_name] = useState(fullname.toLowerCase())
  const [rol, set_rol] = useState('')
  const [error_1, set_error_1] = useState(false)
  const [error_2, set_error_2] = useState(false)

  const handle_rol = event => {
    let value = event.target.value.slice(0, 11).toLowerCase()
    let usm_id = value.slice(0, 9)

    if (isNaN(usm_id)) return
    if (value.length > 9) {
      if (value[9] !== '-')
        value = usm_id + '-' + value.slice(9)
      if (value.length > 10 && isNaN(value[10]) && value[10] !== 'k')
        return
    }
    set_rol(value)
  }

  const rol_verification = _ => {
    set_error_1(rol.length !== 11)
    let formatted_rol = rol.slice(0, 9) + (rol[10] === 'k' ? 0 : rol[10])
  }

  return (
    <div className='Form gapped'>
      <h1>
        <b>Ingresa tus datos</b>
      </h1>
      <div className='gapped'>
        <div>
          <input
            type='text'
            className='box input_field capitalize'
            placeholder='Luis Apellido'
            onChange={event => set_name(event.target.value)}
            value={name}
          />
          <label
            for=''
            class='input_label'
          >
            <b>Rol</b>
          </label>
        </div>
        <div className='gapped'>
          <input
            type='text'
            className='box input_field'
            placeholder='123456789-k'
            onChange={handle_rol}
            onBlur={rol_verification}
            value={rol}
          />
        </div>
        {error_1 && <div className='box error'>Rol Inválido</div>}
        <div>
          <label className='input_label'>
            <b>Nombre completo</b>
          </label>
        </div>
      </div>
      <div className='gapped'>
        <div>
          <input
            type='text'
            className='box input_field capitalize'
            placeholder='Lucho'
            onFocus={_ => set_error_2(true)}
            defaultValue={name.split(' ')[0]}
          />
          <label className='input_label'>
            <b>Apodo</b>
          </label>
        </div>
      </div>
      {error_2 && (
        <div className='box error'>
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
      )}
      <div className='button-container'>
        <button
          className='box cancel'
          type="button"
        >
          <b>Cancelar</b>
        </button>
        <button
          className='box submit'
          type="button"
        >
          <b>Enviar</b>
        </button>
      </div>
    </div>
  )
}
