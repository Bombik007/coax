import React from 'react'

export const Input = ({
        header,
        value, 
        name, 
        type = 'text',
        placeholder, 
        onClick
    }) => (
    <label className='flex'>
        <p>{header}</p>
        <input
            value={value}
            name={name}
            onChange={e => onClick(e.target.value)}
            placeholder={placeholder}
            type={type}
        />
    </label>
)