import * as types from '../constants/ActionTypes'

const initialState = {searchText: ''}

function search(state=initialState, action) {
    console.log('search reducer was called with state', state, 'and action', action);
    switch(action.type) {
        case types.UPDATE_SEARCH_TEXT:
            return {...state, searchText : action.searchText};
            
        default:
            return state;
    } 
    
}

module.exports = search;