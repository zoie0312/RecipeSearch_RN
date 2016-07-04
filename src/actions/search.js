function updateSearchText(text) {
    return {
        type: 'UPDATE_SEARCH_TEXT',
        searchText: text
    }
}

module.exports = updateSearchText;