import React from 'react'
import {useState, forwardRef, useImperativeHandle} from 'react'
import './Schedule.css'
import {mod} from '../utils/Math'
import {CircleOne} from '../assets/circle_one'
import {CircleTwo} from '../assets/circle_two'
// import CircleThree from '../assets/circle_three.svg'


export const Schedule = forwardRef(({booked_schedule}, ref) => {
  const [state, set_state] = useState(false)
  const bussy = useState(booked_schedule)
  const [bussy_schedule, set_bussy_schedule] = bussy
  const available = useState(Array(bussy_schedule.length).fill(false))
  const [available_schedule, set_available_schedule] = available
  
  useImperativeHandle(ref, () => ({
    back: () => change_state(false),
    next: () => change_state(true),
  }))

  const change_state = next_state => {
    if (!next_state) {
      set_available_schedule(Array(bussy_schedule.length).fill(false))
      if (!state)
        set_bussy_schedule(booked_schedule)
    }
    else if (state && next_state)
      console.log('submit')
    set_state(next_state)
  }

  const toggle = schedule => i => {
    const schedule_clone = schedule[0].slice()
    schedule_clone[i] = !schedule_clone[i]
    schedule[1](schedule_clone)
  }

  const toggleBlock = state? i => {if (!bussy_schedule[i]) toggle(available)(i)}: toggle(bussy)//state? toggleAvailable: toggleBussy

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
          <span key={i} className='index row-divisor'>
            <b>
              {(i + 1) * 2 - 1}-{(i + 1) * 2}
            </b>
          </span>
        ))}
        {bussy_schedule.map((value, i) => {
          const even = mod(i, 8 * 2) < 8
          const header =
            i % 8 ? null : (
              <span className={'header' + (even ? ' even-column' : '')}>
                <b>{['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'][i / 8]}</b>
              </span>
            )
          const classes = []
          const modulo = mod(i, 8)
          const schedule = value? bussy_schedule: available_schedule
          if (!schedule[i - 1] || mod(i - 1, 8) > modulo)
            classes.push('top-border')
          if (!schedule[i + 1] || mod(i + 1, 8) < modulo)
            classes.push('bottom-border')

          let cell = (
            <span className={'row-divisor' + (even ? ' even-column' : '')} onClick={_ => toggleBlock(i)}>
              {value
                ? <div className={[booked_schedule[i]? 'booked': 'bussy', ...classes].join(' ')} />
                : available_schedule[i] && <div className={['available', ...classes].join(' ')} />
              }
            </span>
          )
          return [header, cell]
        })}
      </div>
    </div>
  )
})
