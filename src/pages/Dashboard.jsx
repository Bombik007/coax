import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Button, Thumbnail } from '../components'

const grid = 3

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',
  // styles we need to apply on draggables
  ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'white',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
})

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
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {list.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <Thumbnail
                        key={item.id}
                        {...item} 
                        onClick={selectUser}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
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