import React from 'react'
import ReactNative from 'react-native'
import {connect} from 'react-redux'

import IngredientEntity from './IngredientEntity'
import switchTab from '../actions/navigation'
import {updateUserIngredientsViewList, syncUserIngredients, resetUserIngredientsView} from '../actions/ingredient'
import * as appdata from '../constants/AppData'

let {
    View,
    StyleSheet,
    Text,
    ToolbarAndroid,
    ListView,
    Alert,
    ProgressBarAndroid,
    AsyncStorage
} = ReactNative


var UserIngredientsView = React.createClass({
    
    
    getDefaultProps: function() {
        return {
            updateIngredients: {},
            path: '',
            initialListData: []
        }
    },
    
    componentDidMount: function() {
        
        this.context.addBackButtonListener(this.handleBackButton);
        this.oldViewData = [];
        
    },
    
    componentWillMount: function() {
        var me = this;
        try {
            AsyncStorage.getItem(appdata.STORAGE_KEY_USERLOCALINGREDIENTS, (err, result) => {
                me.localUserIngredients = JSON.parse(result);
            });
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message)
        }
    },
    
    componentWillUnmount: function() {
        this.context.removeBackButtonListener(this.handleBackButton);
        this.oldViewData = [];
        this.props.dispatch(resetUserIngredientsView());
    },
    
    handleBackButton: function() {
        var me = this;
        if (me.oldViewData.length > 0) {
            var nextViewData = me.oldViewData.pop();
            me.props.dispatch(updateUserIngredientsViewList(nextViewData.path, nextViewData.listData));
        } else {
        
            Alert.alert('離開!', '儲存變更?', 
                [
                    {text: 'Yes', onPress:  me.exitWithSave},
                    {text: 'No', onPress: me.exitWithoutSave}
                        
                ]
            );
        }
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
        var isOwned;
        if (rowData.leaf) {
            
            if (rowData.text in this.props.updateIngredients.names) { //dirty changes
                isOwned = this.props.updateIngredients.names[rowData.text];
            } else {
                isOwned = this.localUserIngredients[rowData.text] ? true : false;
            }
        }
        
        return (
            <IngredientEntity
                name={rowData.text}
                key={rowData.text}
                items={rowData.items}
                leaf={rowData.leaf}
                id={rowData.id}
                isOwned={isOwned}
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
        this.props.dispatch(syncUserIngredients(this.props.updateIngredients));
    },
    
    getUpdatingView: function() {
        if (this.props.isUpdatingUserIngredients) {
            return (
                <View style={styles.updatingContainer}>
                    <Text style={{color: "blue"}}>Updating Ingredients...</Text>
                    <ProgressBarAndroid 
                        styleAttr="Normal"
                        color="blue"
                    />
                </View>
            )
        }
    },
    
    exitWithoutSave: function() {
        if (this.props.tab !== 'Home') {
            this.props.dispatch(switchTab('Home'));
        }
    },
    
    componentWillUpdate: function(nextProps, nextStates) {
        var newPath = nextProps.path;
        if (newPath.indexOf(this.props.path) > -1 && newPath !== this.props.path) {
            this.oldViewData.push({
                path: this.props.path,
                listData: this.props.listData
            });
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
                <Text style={styles.path}>{this.props.path}</Text>
                <ListView
                    dataSource={dataSource}
                    renderRow={this._renderRow}
                    initialListSize={1}
                    pageSize={2} 
                    style={styles.container1}
                />
                {this.getUpdatingView()}
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
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    updatingContainer: {
        flex: 1,
        position: 'absolute',
        top: 200,
        marginLeft: 125
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
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
    path: {
        fontSize: 16,
        color: '#DF7400'    
    }
});

function select(state) { //mapStateToProps from Redux
    return {
        updateIngredients: state.ingredient.updateIngredients,
        path: state.ingredient.userIngredientsViewPath,
        listData: state.ingredient.userIngredientsListData,
        isUpdatingUserIngredients: state.ingredient.syncingUserIngredients
    }
}

export default connect(select)(UserIngredientsView)