import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Button, Thumbnail } from '../components'

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

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
    }

  const onDragEnd = (result) => {
    if (!result.destination) return

    const items = reorder(
        list,
        result.source.index,
        result.destination.index
    )
        setList(items)
    }

    return (
      <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              className='testList'
              {...provided.droppableProps}
            >
              {
                list.map((el, index) => (
                <Draggable 
                  key={el.id} 
                  draggableId={el.id} 
                  index={index}
                >
                  {(provided) => (
                    <div
                      className='testItem'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
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
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button text='Add Contact' onClick={goToForm}/>
      </>
    )
  }

const mapStateToProps = store => ({userList: store.userList})

export default connect(mapStateToProps)(Dashboard)