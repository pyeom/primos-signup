import React from 'react'
import {useState} from 'react';

export const Form = () => {
    const [name, set_apodo] = useState('');
    const [rol, set_rol] = useState('');
    const [formatted_rol, set_formatted_rol] = useState('');

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

    const rol_verification = event => {
        // Ver quel rol te weno digito verificador y weá
        if (rol.length != 11 && true) {
            // Hacer que te diga que está malo
            return
        }
        // Quitarle el guión y cambiar k x 0
        set_formatted_rol(rol)
    }

    return (
        <div>
            <br />
            <label>
                ROL: <input onChange={handle_rol} onBlur={rol_verification} value={rol}/>
            </label>
            <div>{formatted_rol}</div>
            <br />
            <label>
                Nombre Completo: <input onChange={event => set_apodo(event.target.value)} value={name}/>
            </label>
            <br />
            <label>
                Apodo: <input defaultValue={name.split(' ')[0]}/>
            </label>
        </div>
    )
}