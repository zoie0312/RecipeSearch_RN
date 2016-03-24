import {combineReducers} from 'redux'

var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        // etc.
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    items: itemsReducer
})

export default rootReducer