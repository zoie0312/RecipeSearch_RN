import * as types from '../constants/ActionTypes'

export default function recipe(state={}, action) {
    //console.log('RecipeList reducer was called with state', state, 'and action', action)
    switch(action.type) {
        case types.DISPLAY_SEARCH:
            return Object.assign({}, state, {
                isSearching: true,
                isFetchingRecipes: false
            })
            
        case types.FETCH_RECIPES:
             return Object.assign({}, state, {
                 isSearching: false,
                 isFetchingRecipes: true 
             })
        default: 
            return state
    }
}