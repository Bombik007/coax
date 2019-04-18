import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Input } from '../components'

const defaultUserData = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    date: '',
    email: ''
}

const Form = ({ activeUser, userList, dispatch, history }) => {
    activeUser = !Object.keys(activeUser).length ? defaultUserData : activeUser

    const [ form, setValues ] = useState(activeUser);
    const { firstName, lastName, phoneNumber, date, email } = form;

    const onChange = (event) => {
        setValues({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        let result = [...userList]

        if (userList.includes(activeUser)) {
            const index = userList.findIndex(el => el.id === activeUser.id)
            form.id = activeUser.id
            result.splice(index, 1, form)
        } else {
            result.push({...form, id: userList.length + 1})
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
                onClick={onChange}
            />
            <Input
                header='Last Name'
                value={lastName}
                name="lastName"
                placeholder="Enter last name"
                onClick={onChange}
            />
            <Input
                header='Phone Number'
                value={phoneNumber}
                name="phoneNumber"
                placeholder="Enter your phone number"
                onClick={onChange}
            />
            <Input
                header='Email Address'
                value={email}
                name="email"
                placeholder="Enter your email address"
                onClick={onChange}
                type="email"
            />
            <Input
                header='Date of birth'
                value={date}
                name="date"
                placeholder="Enter your date of birth"
                onClick={onChange}
            />
            <Button text="Save Contact"/>
        </form>
    )
}

const mapStateToProps = ({ userList, activeUser}) => ({ userList, activeUser })

export default connect(mapStateToProps)(Form)