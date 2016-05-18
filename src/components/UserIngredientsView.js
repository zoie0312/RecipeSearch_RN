import React from 'react-native'

let {
    View,
    StyleSheet,
    Text,
    ToolbarAndroid,
    TouchableHighlight,
    ListView,
} = React

import {connect} from 'react-redux'

import IngredientCategory from './IngredientCategory'
import MOCKED_INGREDIENT_DATA from '../constants/IngredientData'

var UserIngredientsView = React.createClass({
    
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            collapsed: true,
            dataSource: ds.cloneWithRows(this._genRows()),
        }
    },
    
    getDefaultProps: function() {
        return {
            updateIngredients: {}
        }
    },
  
    _genRows: function() {
        return MOCKED_INGREDIENT_DATA;
    },
  
    _renderRow: function(rowData, sectionID, rowID) {
        return (
            <IngredientCategory
                name={rowData.text}
                items={rowData.items}/>
                
        )
    },

    render: function() {
        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title="     我的食材"
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    initialListSize={1}
                    pageSize={3} 
                    style={styles.container1}/>
                
            </View>
                
        )
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    content1: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    toolbar: {
        backgroundColor: 'blue',
        height: 50
    },
    container1: {
        flex: 1,
        //justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        marginBottom: 20,
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    }
});

function select(store) { //mapStateToProps from Redux
    return {
        updateIngredients: store.ingredient.updateIngredients
    }
}

export default connect(select)(UserIngredientsView)