import ReactNative from 'react-native'
let { AsyncStorage } = ReactNative

import * as types from '../constants/ActionTypes'
import {SEARCH_RECIPE_URL, STORAGE_KEY_USERNAME} from '../constants/AppData'

export function searchRecipes(searchObject) {
    var json_data = {};
    json_data[parseInt(searchObject.ingredient)] = true;
    json_data['username'] = searchObject.username;
    let opt = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        method: 'POST',
        //body: JSON.stringify({78: true})
        body: JSON.stringify(json_data)
        
    }
    return (dispatch, getState) => {
        dispatch(displaySearch(searchObject))
        return fetch(SEARCH_RECIPE_URL, opt)
            //.then(response => {debugger;response.json()})
            .then(response => {
                return response.json();})
            .then(resp => {
                //console.log('search recipe responsed successfully');
                if (resp.username !== searchObject.username) {
                    AsyncStorage.setItem(STORAGE_KEY_USERNAME, JSON.stringify(resp.username), () => {
                        dispatch(fetchRecipes());
                    });
                } else {
                    dispatch(fetchRecipes());
                }
                
            })
            .catch(error => console.log(error))
    }
}

export function finishFetchingRecipes() {
    return {
        type: types.FINISH_FETCHING_RECIPES
    }
} 

export function displaySearch(searchObject) {
    return {
        type: types.DISPLAY_SEARCH
        
    }
}

export function fetchRecipes() {
    return {
        type: types.FETCH_RECIPES
    }
}