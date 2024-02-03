import React from 'react'

function Input({id, label, ...props}) {
  return (
    <p className='control'>
      <label htmlFor={id}>{label}</label>
      <input {...props} required id={id} name={id}/>
    </p>
  )
}

export default Input