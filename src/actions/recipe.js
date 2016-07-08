import * as types from '../constants/ActionTypes'

//let SEARCH_RECIPE_URL = 'http://192.168.43.27:8020/recipematch/search_recipes/'
let SEARCH_RECIPE_URL = 'http://192.168.0.100:8020/recipematch/search_recipes/'

export function searchRecipes(searchIngredients) {
    var json_data = {};
    json_data[parseInt(searchIngredients)] = true;
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
        dispatch(displaySearch(searchIngredients))
        return fetch(SEARCH_RECIPE_URL, opt)
            //.then(response => {debugger;response.json()})
            .then(response => {
                console.log('search recipe responsed successfully');
                dispatch(fetchRecipes());
            })
            .catch(error => console.log(error))
    }
}

export function finishFetchingRecipes() {
    return {
        type: types.FINISH_FETCHING_RECIPES
    }
} 

export function displaySearch(searchText) {
    return {
        type: types.DISPLAY_SEARCH
        
    }
}

export function fetchRecipes() {
    return {
        type: types.FETCH_RECIPES
    }
}