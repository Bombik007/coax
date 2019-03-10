const initialState = {
    userList: [],
    activeUser: {},
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LIST': {
            return { ...state, userList: action.userList }
        }
        case 'SET_USER': {
            return { ...state, activeUser: action.activeUser }
        }
        default: {
            return state
        }
    }
}