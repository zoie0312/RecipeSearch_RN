import * as types from '../constants/ActionTypes'

const initialState = {tab: 'main'}

function navigation(state=initialState, action) {
    switch(action.type) {
        case types.SWITCH_TAB:
            return {...state, tab: action.tab};
            
        default:
            return state;
    } 
    
}

module.exports = navigation;