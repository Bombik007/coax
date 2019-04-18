import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Button, Thumbnail } from '../components'
import { actionTypes } from '../store/actionTypes';

const reorderList = (list, startIndex, endIndex) => {
    const result = [...list]
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}

const Dashboard = ({userList, dispatch, history}) => {
    const { SET_LIST, SET_USER } = actionTypes;
    let [list, setList] = useState(userList)
    
    useEffect(() => {
        const rawData = localStorage.getItem('ccx')
        if (rawData !== null) {
            const data = JSON.parse(rawData)
            setList(data)
            dispatch({type: SET_LIST, userList: data})
        }
    }, [])
  
    const selectUser = (id) => {
        const activeUser = list.find(el => el.id === id)
        dispatch({type: SET_USER, activeUser})
        history.push('/user')
    }
  
    const goToForm = (event) => {
        event.preventDefault()
        dispatch({type: SET_USER, activeUser: {}})
        history.push('/user')
    }

    const onDragEnd = ({destination, source}) => {
        if (!destination) return

        const items = reorderList(
            list,
            source.index,
            destination.index
        )
        setList(items)
        localStorage.setItem('ccx', JSON.stringify(items))
    }

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {({droppableProps, innerRef, placeholder}) => (
                        <div
                            className='testList'
                            ref={innerRef}
                            {...droppableProps}
                        >
                        {
                            list.map((el, index) => (
                            <Draggable 
                                key={el.id} 
                                draggableId={el.id} 
                                index={index}
                            >
                                {({draggableProps, dragHandleProps, innerRef}) => (
                                    <div
                                        className='testItem'
                                        ref={innerRef}
                                        {...draggableProps}
                                        {...dragHandleProps}
                                    >
                                        <Thumbnail
                                            key={el.id}
                                            {...el} 
                                            onClick={selectUser}
                                        />
                                    </div>
                                )}
                            </Draggable>
                            ))
                        }
                        {placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <Button text='Add Contact' onClick={goToForm}/>
        </>
    )
}

const mapStateToProps = ({ userList }) => ({ userList })

export default connect(mapStateToProps)(Dashboard)