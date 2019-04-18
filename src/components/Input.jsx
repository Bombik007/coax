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
            onChange={onClick}
            placeholder={placeholder}
            type={type}
            required
        />
    </label>
)