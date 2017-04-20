import * as types from '../constants/ActionTypes'

const initialState = {
    searchText: '',
    searchResult: {}
}

function search(state=initialState, action) {
    
    switch(action.type) {
        case types.UPDATE_SEARCH_TEXT:
            return {...state, searchText : action.searchText};
            
        case types.UPDATE_SEARCH_RESULT:
            return {...state, searchResult: action.searchResult};
            
        default:
            return state;
    } 
    
}

module.exports = search;