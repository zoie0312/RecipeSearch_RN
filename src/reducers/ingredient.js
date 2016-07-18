import * as types from '../constants/ActionTypes'

const initialState = {
    updateIngredients: {},
    userIngredientsViewPath: '',
    userIngredientsListData: []
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
        default:
            return state;
    }
}

module.exports = ingredient;