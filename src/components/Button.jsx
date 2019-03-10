import React from "react"

export const Button = ({text, onClick}) => (
    <div className='wrapper'>
        <button onClick={onClick}>{text}</button>
    </div>
)