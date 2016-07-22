import ReactNative from 'react-native'

import * as types from '../constants/ActionTypes'
import switchTab from './navigation'
import {STORAGE_KEY} from '../constants/AppData'

let {
    AsyncStorage
} = ReactNative

let UPDATE_INGREDIENTS_URL = 'http://192.168.0.100:8020/recipematch/update_ingredients/'
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

export function syncUserIngredients(updatedIngredients) {
    let opt = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        method: 'POST',
        //body: JSON.stringify({78: true})
        body: JSON.stringify(updatedIngredients)
        
    }
    return (dispatch, getState) => {
        dispatch(showSyncingIngredients())
        return fetch(UPDATE_INGREDIENTS_URL, opt)
            .then(response => {
                console.log('update ingredients successfully');
                dispatch(finishSyncingIngredients());
                dispatch(switchTab('Home'));
                AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(updatedIngredients), () => {
                    console.log('updated ingredients saved locally');
                });
            })
            .catch(error => console.log(error))
    }
}

export function showSyncingIngredients() {
    return {
        type: types.SHOW_SYNCING_INGREDIENTS
    }
}

export function finishSyncingIngredients() {
    return {
        type: types.FINISH_SYNCING_INGREDIENTS
    }
}

export function resetUserIngredientsView () {
    return {
        type: types.RESET_USER_INGREDIENTS_VIEW
    }
}