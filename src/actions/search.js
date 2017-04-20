export function updateSearchText(text) {
    return {
        type: 'UPDATE_SEARCH_TEXT',
        searchText: text
    }
}

export function updateSearchResult(data) {
    return {
        type: 'UPDATE_SEARCH_RESULT',
        searchResult: data
    }
}

