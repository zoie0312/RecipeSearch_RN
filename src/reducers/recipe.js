import * as types from '../constants/ActionTypes'

const initialState = {
    isSearching: false,
    isFetchingRecipes: false
}

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
             
        case types.FINISH_FETCHING_RECIPES:
            return {...state, isFetchingRecipes: false}
        default: 
            return state
    }
}