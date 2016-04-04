import React from 'react-native'

let {
    view
} = React

import {connect} from 'react-redux'

import Main from '../components/Main'

class MainContainer extends React.Component {
    render() {
        return (
            <Main {...this.props} />
        )
    } 
}

function mapStateToProps(state) {
    const { items, RecipeList } = state
    return {
        items,
        RecipeList
        //reduxState: state
    }
}

export default connect(mapStateToProps)(MainContainer)