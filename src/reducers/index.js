import {combineReducers} from 'redux'

import recipe from './recipe'
import navigation from './navigation'
import ingredient from './ingredient'
import search from './search'

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
    recipe: recipe,
    navigation: navigation,
    ingredient: ingredient,
    search: search
})

export default rootReducer