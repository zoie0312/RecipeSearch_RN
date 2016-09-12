import * as types from '../constants/ActionTypes'

const initialState = {
    updateIngredients: {ids: {}, names: {}},
    userIngredientsViewPath: '',
    userIngredientsListData: [],
    syncingUserIngredients: false
}

function ingredient(state=initialState, action) {
    console.log('ingredient reducer was called with state', state, 'and action', action);
    switch (action.type) {
        case types.UPDATE_INGREDIENT_OWNERSHIP:
            var t2 = {ids: {}, names: {}};
            t2.ids = Object.assign({}, state.updateIngredients.ids, action.updateIngredient.ids);
            t2.names = Object.assign({}, state.updateIngredients.names, action.updateIngredient.names);
            return {...state, updateIngredients: t2};
            
        case types.UPDATE_USER_INGREDIENTS_VIEW_LIST_DATA:
            return Object.assign({}, state, {
                userIngredientsViewPath: action.newPath,
                userIngredientsListData: action.newListData
            });
            
        case types.SHOW_SYNCING_INGREDIENTS:
            return {...state, syncingUserIngredients: true};
            
        case types.FINISH_SYNCING_INGREDIENTS:
            return {...state, syncingUserIngredients: false, updateIngredients: {ids: {}, names: {}}};
           
        case types.RESET_USER_INGREDIENTS_VIEW:
            return initialState
        
        default:
            return state;
    }
}

module.exports = ingredient;