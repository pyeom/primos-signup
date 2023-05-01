import React from 'react'
import {useState, useRef} from 'react'
import './Schedule.css'
import {mod} from '../utils/Math'
import {CircleOne} from '../assets/circle_one'
import {CircleTwo} from '../assets/circle_two'
// import CircleThree from '../assets/circle_three.svg'


export const Schedule = ({schedule}) => {
  const [schedulesi, setSchedulesi] = useState(schedule.map(bool => bool? 1: 0))
  

  const toggleBlock = block => {
    const newArray = [...schedulesi]
    console.log(block)
    if (newArray[block] != 1){
      newArray[block]= newArray[block]==0? 2: 0
      setSchedulesi(newArray)
      console.log(schedulesi)
    }
    else{
      setSchedulesi(newArray)
      console.log(schedulesi)
    }
  }

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
        &ensp;Importa tu horario&nbsp;
        <CircleTwo
          size='1em'
          fill='#5168f4'
        />
        &ensp;Ajusta tu disponibilidad
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
        {schedulesi.map((value, i) => {
          let even = mod(i, 8 * 2) < 8
          let header =
            i % 8 ? null : (
              <span className={'header' + (even ? ' even-column' : '')}>
                <b>{['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'][i / 8]}</b>
              </span>
            )
          let classes = ['booked']
          let classesamarillo = ['bussy']
          if (value) {
            let modulo = mod(i, 8)
            if (mod(i - 1, 8) < modulo && !schedulesi[i - 1]) classes.push('top-border')
            if (mod(i + 1, 8) > modulo && !schedulesi[i + 1]) classes.push('bottom-border')
          }
          let cell = (
            <span className={'row-divisor' + (even ? ' even-column' : '')} onClick={_ => toggleBlock(i)}>
              {(value == 1) && <div className={classes.join(' ')} />}
              {(value == 2) && <div className={classesamarillo.join(' ')} />}
            </span>
          )
          return [header, cell]
        })}
      </div>
    </div>
  )
}
