import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Input } from '../components'

const Form = ({ activeUser, userList, dispatch, history }) => {
    let [firstName, setFirstName] = useState(activeUser.firstName || '')
    let [lastName, setLastName] = useState(activeUser.lastName || '')
    let [phoneNumber, setPhoneNumber] = useState(activeUser.phoneNumber || '')
    let [date, setDate] = useState(activeUser.date ||'')
    let [email, setEmail] = useState(activeUser.email || '')

    const onSubmit = (event) => {
        event.preventDefault()
        const { id } = activeUser
        const user = {
            firstName, 
            lastName, 
            phoneNumber,
            date,
            email
        }
        let result = [...userList]

        if (userList.includes(activeUser)) {
            user.id = id
            const index = userList.findIndex(el => el.id === id)
            result.splice(index, 1, user)
        } else {
            result.push({...user, id: userList.length + 1})
        }

        dispatch({type: 'SET_LIST', userList: result})
        localStorage.setItem('ccx', JSON.stringify(result))
        history.push('/')
    }
    return (
        <form className='paper' onSubmit={onSubmit}>
            <Input
                header='First Name'
                value={firstName}
                name="firstName"
                placeholder="Enter first name"
                onClick={setFirstName}
            />
            <Input
                header='Last Name'
                value={lastName}
                name="lastName"
                placeholder="Enter last name"
                onClick={setLastName}
            />
            <Input
                header='Phone Number'
                value={phoneNumber}
                name="phoneNumber"
                placeholder="Enter your phone number"
                onClick={setPhoneNumber}
            />
            <Input
                header='Email Address'
                value={email}
                name="email"
                placeholder="Enter your email address"
                onClick={setEmail}
                type="email"
            />
            <Input
                header='Date of birth'
                value={date}
                name="date"
                placeholder="Enter your date of birth"
                onClick={setDate}
            />
            <Button text="Save Contact"/>
        </form>
    )
}

const mapStateToProps = store => ({
    userList: store.userList,
    activeUser: store.activeUser
})

export default connect(mapStateToProps)(Form)