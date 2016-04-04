import {combineReducers} from 'redux'

import RecipeList from './RecipeList'

var itemsReducer = function (state = {}, action) {
    //console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        // etc.
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    items: itemsReducer,
    RecipeList
})

export default rootReducer