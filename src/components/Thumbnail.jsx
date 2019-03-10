import React from 'react'

export const Thumbnail = ({id, firstName, lastName, phoneNumber, email, onClick}) => (
    <article className='paper thumbnail' onClick={() => onClick(id)}>
        <h2>{firstName} {lastName}</h2>
        <p>{phoneNumber}</p>
        <p>{email}</p>
    </article>
)