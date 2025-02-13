import React from 'react'
import {useState, useRef} from 'react'
import './Form.css'

export const Form = ({fullname, mail, is_schedule, set_schedule, schedule_ref}) => {
  const [name, set_name] = useState(fullname.toLowerCase())
  const [error_1, set_error_1] = useState(false)
  const [rol, set_rol] = useState('')
  const [error_2, set_error_2] = useState(false)
  const siga_password = useRef(null)
  const [disable_button, set_disable_button] = useState(false)
  const [error_3, set_error_3] = useState(false)

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
    set_error_1(rol.length !== 11)
    let formatted_rol = rol.slice(0, 9) + (rol[10] === 'k' ? 0 : rol[10])
  }

  async function get_schedule() {
    set_disable_button(true)
    const request_options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: mail[0],
        server: mail[1],
        passwd: siga_password.current.value,
      }),
    }
    await fetch('http://127.0.0.1:8000/api/schedule', request_options).then(response => {
      if (response.ok)
        response.json().then(r => set_schedule(r.schedule))
      else
        set_error_3(true)
    })
    set_disable_button(false)
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
          <label className='input_label'>
            <b>Nombre Completo</b>
          </label>
        </div>
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
        <label className='input_label'>
          <b>Rol</b>
        </label>
      </div>
      {error_1 && <div className='box info error'>Rol Inválido</div>}
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
      {(!is_schedule && error_2) && (
        <div className='box info error'>
          <u>Nota</u>: Elige un apodo fácilmente identificable por todos tus compañeros; tu primer,
          segundo, ámbos nombres o tu nombre social son una buena opción.&ensp;
          <b>Evita usar tu Gamer Tag</b> o cualquier apodo que sea difícil de relacionar contigo
          para alguien que no te conoce de primera mano.
          <br />
          <br />
          <div className='examples'>
            <div>
              Felipe Rojas → Pipe ✔️
              <br />
              Felipe Rojas → pyeom ❌
            </div>
            <div>
              Vicente Mackenzie → Makenki ✔️
              <br />
              Vicente Mackenzie → 3122 ❌
            </div>
          </div>
        </div>
      )}
      <div className='gapped'>
        <div>
          <input
            ref={siga_password}
            className='box input_field capitalize'
            type='password'
            disabled={is_schedule}
          />
          <label className='input_label'>
            <b>Clave del SIGA</b>
          </label>
        </div>
      </div>
      {(!error_3 || is_schedule) && (
        <div className='box info'>
          Tus credenciales de acceso al SIGA serán utilizadas exclusivamente para obtener tu horario
          y no serán almacenadas de ninguna forma. Recuerda que este proyecto es open source, por lo
          que puedes revisar cómo serán tratados tus datos diréctamente en el código fuente
          <a href='https://github.com/m3122/primos-signup'>Front-end</a>
          <a href='https://github.com/lilkimo/primos-signup-backend'>Back-end</a>
        </div>
      )}
      {!is_schedule ? (
        <>
          {error_3 && <div className='box info error'>Clave incorrecta</div>}
          <div className='button-container'>
            <button
              className='box submit'
              type='button'
              disabled={disable_button}
              onClick={_ => get_schedule()}
            >
              <b>Importar Horario</b>
            </button>
          </div>
        </>
      ) : (
        <div className='button-container'>
          {<button
            className='box cancel'
            type="button"
            onClick={_ => schedule_ref.current?.back()}
          >
            <b>Atrás</b>
          </button>}
          <button
            className='box submit'
            type='button'
            onClick={_ => schedule_ref.current?.next()}
          >
            <b>Siguiente</b>
          </button>
        </div>
      )}
    </div>
  )
}
