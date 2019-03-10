import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Thumbnail, Button } from './../components'

const Dashboard = ({userList, dispatch, history}) => {
    let [list, setList] = useState(userList)

    useEffect(() => {
        if (!userList.length) {
            const rawData = localStorage.getItem('ccx')
            if (rawData !== null) {
                const data = JSON.parse(rawData)
                setList(data)
                dispatch({type: 'SET_LIST', userList: data})
            }
        }
    }, [])

    const selectUser = (id) => {
        const activeUser = list.find(el => el.id === id)
        dispatch({type: 'SET_USER', activeUser})
        history.push('/user')
    }

    const goToForm = (event) => {
        event.preventDefault()
        dispatch({type: 'SET_USER', activeUser: {}})
        history.push('/user')
    }

    return (
        <>  
            <section className='container'>
                {
                    list.map(el => (
                        <Thumbnail
                            key={el.id}
                            {...el} 
                            onClick={selectUser}
                        />
                    ))
                }
            </section>
            <Button text='Add Contact' onClick={goToForm}/>
        </>
    )
}

const mapStateToProps = store => ({userList: store.userList})

export default connect(mapStateToProps)(Dashboard)