import React from 'react'
import './Schedule.css'
import {mod} from '../utils/Math'
import {CircleOne} from '../assets/circle_one'
// import CircleTwo from '../assets/circle_two.svg'
// import CircleThree from '../assets/circle_three.svg'

export const Schedule = ({schedule}) => {
  return (
    <div className='Schedule gapped'>
      <h1>
        <b>Rellena tu horario</b>
      </h1>
      <h2>
        <CircleOne
          size='1em'
          fill='#5168f4'
        />
        &ensp;Importa tu horario
      </h2>
      {/* <b>Ajusta tu disponibilidad</b>&gt;
        <b>Ingresa tu horario deseado</b> */}
      <div className='container'>
        <span />
        {[...Array(8).keys()].map(i => (
          <span className='index row-divisor'>
            <b>
              {(i + 1) * 2 - 1}-{(i + 1) * 2}
            </b>
          </span>
        ))}
        {schedule.map((value, i) => {
          let even = mod(i, 8 * 2) < 8
          let header =
            i % 8 ? null : (
              <span className={'header' + (even ? ' even-column' : '')}>
                <b>{['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'][i / 8]}</b>
              </span>
            )
          let classes = ['booked']
          if (value) {
            let modulo = mod(i, 8)
            if (mod(i - 1, 8) < modulo && !schedule[i - 1]) classes.push('top-border')
            if (mod(i + 1, 8) > modulo && !schedule[i + 1]) classes.push('bottom-border')
          }
          let cell = (
            <span className={'row-divisor' + (even ? ' even-column' : '')}>
              {value && <div className={classes.join(' ')} />}
            </span>
          )
          return [header, cell]
        })}
      </div>
    </div>
  )
}
