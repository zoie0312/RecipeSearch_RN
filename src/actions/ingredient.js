import * as types from '../constants/ActionTypes'

export function updateIngredientOwnership(updateIngredient) {
    return {
        type: 'UPDATE_INGREDIENT_OWNERSHIP',
        updateIngredient
    }
}

export function updateUserIngredientsViewList(newPath, newListData) {
    return {
        type: types.UPDATE_USER_INGREDIENTS_VIEW_LIST_DATA,
        newPath,
        newListData
    }
}

