import * as types from '../constants/ActionTypes'

const initialState = {
    updateIngredients: {},
    userIngredientsViewPath: '',
    userIngredientsListData: [],
    syncingUserIngredients: false
}

function ingredient(state=initialState, action) {
    console.log('ingredient reducer was called with state', state, 'and action', action);
    switch (action.type) {
        case types.UPDATE_INGREDIENT_OWNERSHIP:
            var t2 = Object.assign({}, state.updateIngredients, action.updateIngredient);
            return {...state, updateIngredients: t2};
            
        case types.UPDATE_USER_INGREDIENTS_VIEW_LIST_DATA:
            return Object.assign({}, state, {
                userIngredientsViewPath: action.newPath,
                userIngredientsListData: action.newListData
            });
            
        case types.SHOW_SYNCING_INGREDIENTS:
            return {...state, syncingUserIngredients: true};
            
        case types.FINISH_SYNCING_INGREDIENTS:
            return {...state, syncingUserIngredients: false, updateIngredients: {}};
           
        default:
            return state;
    }
}

module.exports = ingredient;