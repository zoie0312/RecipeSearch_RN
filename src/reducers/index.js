import {combineReducers} from 'redux'

import recipe from './recipe'
import navigation from './navigation'
import ingredient from './ingredient'
import search from './search'


const rootReducer = combineReducers({
    recipe: recipe,
    navigation: navigation,
    ingredient: ingredient,
    search: search
})

export default rootReducer