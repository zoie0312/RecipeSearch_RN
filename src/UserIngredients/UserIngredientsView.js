import React from 'react'
import ReactNative from 'react-native'
import {connect} from 'react-redux'

import IngredientEntity from './IngredientEntity'
import MOCKED_INGREDIENT_DATA from '../constants/IngredientData'
import switchTab from '../actions/navigation'

let {
    View,
    StyleSheet,
    Text,
    ToolbarAndroid,
    TouchableHighlight,
    ListView,
    Alert
} = ReactNative


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
            updateIngredients: {},
            path: '',
            initialListData: []
        }
    },
    
    componentDidMount: function() {
        this.context.addBackButtonListener(this.handleBackButton);
    },
    
    componentWillUnmount: function() {
        this.context.removeBackButtonListener(this.handleBackButton);
    },
    
    handleBackButton: function() {
        var me = this;
        Alert.alert('離開!', '儲存變更?', 
            [
                {text: 'Yes', onPress:  me.exitWithSave},
                {text: 'No', onPress: me.exitWithoutSave}
                    
            ]
        );
        return true;
    },
  
    _genRows: function() {
        if (this.props.listData.length > 0) {
            return this.props.listData;
        } else {
            return this.props.initialListData;
        }
    },
  
    _renderRow: function(rowData, sectionID, rowID) {
        return (
            <IngredientEntity
                name={rowData.text}
                key={rowData.text}
                items={rowData.items}
                leaf={rowData.leaf}
                id={rowData.id}
                parentPath={this.props.path}
                
            />
                
        )
    },
    
    exit: function(position) {  
        var me = this;
        Alert.alert('離開!', '儲存變更?', 
            [
                {text: 'Yes', onPress:  me.exitWithSave},
                {text: 'No', onPress: me.exitWithoutSave}
                    
            ]
        );
    },
    
    exitWithSave: function() {
        console.log('exit with save');
        if (this.props.tab !== 'Home') {
            this.props.dispatch(switchTab('Home'));
            //return true;
        }
    },
    
    exitWithoutSave: function() {
        console.log('exit without save');
        if (this.props.tab !== 'Home') {
            this.props.dispatch(switchTab('Home'));
            //return true;
        }
    },

    render: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            dataSource;
        if (this.props.listData.length > 0) {
            dataSource = ds.cloneWithRows(this.props.listData);
        } else {
            dataSource = ds.cloneWithRows(this.props.initialListData);
        }
        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title="     我的食材"
                    actions={[{title: 'back', icon: require('../../assets/ic_arrow_back_black_24dp.png'), show: 'always'}]}
                    onActionSelected={this.exit}
                />
                <ListView
                    dataSource={dataSource}
                    renderRow={this._renderRow}
                    initialListSize={1}
                    pageSize={2} 
                    style={styles.container1}
                />
                
            </View>
                
        )
    }
});

UserIngredientsView.contextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func
};

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

function select(state) { //mapStateToProps from Redux
    return {
        updateIngredients: state.ingredient.updateIngredients,
        path: state.ingredient.userIngredientsViewPath,
        listData: state.ingredient.userIngredientsListData
    }
}

export default connect(select)(UserIngredientsView)