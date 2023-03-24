import React from 'react'
import {useState} from 'react';

export const Form = () => {
    const [apodo, setApodo] = useState('');
    const [rol, setRol] = useState('');
    const [rolLimpio, setRolLimpio] = useState('');

    const handleChange = event => {
        setApodo(event.target.value);
    }

    const handlerolChange = event => {
        setRol(event.target.value);
    }

    const handleRol = event => {
        let aux = '';
        const rolRgx = /(\d{9})-(\d|k)/i.exec(rol);
        if (rolRgx[2] == 'k' || rolRgx[2] == 'K'){
            aux = '0';
        }
        else{
            aux = rolRgx[2];
        }

        setRolLimpio(rolRgx[1]+aux);
    }

    return (
        <div>
            <br></br>
            <label>
                ROL: <input onChange={handlerolChange} onBlur={handleRol} value={rol}/>
            </label>
            <br></br>
            <label>
                Nombre Completo: <input onChange={handleChange} value={apodo}/>
            </label>
            <br></br>
            <label>
                Apodo: <input defaultValue={apodo.split(' ')[0]}/>
            </label>

            <div>{rolLimpio}</div>
        </div>
  )
}