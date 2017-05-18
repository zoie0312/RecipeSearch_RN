import React from 'react'
import ReactNative from 'react-native'

let {
    View,
    DrawerLayoutAndroid,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    Navigator
} = ReactNative

import {connect} from 'react-redux'

import Main from '../components/Main'
import UserIngredientsView from '../components/UserIngredientsView'
import ShoppingList from '../components/ShoppingList'
import MenuItem from '../components/MenuItem'
import switchTab from '../actions/navigation'

class MainContainer extends React.Component {
    //  props: {
    //      tab: 'MainContainer',
    //      navigator: Navigator
    //  };
       
    constructor(props) {
        super(props);
        
        this.renderNavigationView = this.renderNavigationView.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
        //this.onTabSelect = this.onTabSelect.bind(this);
    }
    
    getChildContext() {
        return {
            openDrawer: this.openDrawer,
        };
    }
    
    openDrawer() {
        this.refs.drawer.openDrawer();
    }
    
    onTabSelect(tab) {
        if (this.props.tab !== tab) {
            this.props.onTabSelect(tab);
        }
        this.refs.drawer.closeDrawer();
        // this.props.navigator.push({
        //     name: 'userIngredients',
        //     component: UserIngredientsView
        // });
    } 
    
    renderNavigationView() {
        return (
            <View style={styles.drawer}>
                <MenuItem
                    title="My Ingredients"
                    onPress={this.onTabSelect.bind(this, 'user-ingredients')}
                />
                <MenuItem
                    title="My Shopping List"
                    onPress={this.onTabSelect.bind(this, 'user-shoppinglist')}
                />
                <MenuItem
                    title="Settings"
                    onPress={this.onTabSelect.bind(this, 'settings')}
                />    
            </View>
        )
    }
    
    renderContent() {
        switch (this.props.tab) {
            case 'main':
                return (
                    <Main {...this.props}/>
                );
                
            case 'user-ingredients': 
                return (
                    <UserIngredientsView {...this.props} />
                );
                
            case 'user-shoppinglist':
                return (
                    <ShoppingList {...this.props} />
                );
                
            case 'settings':
                return;
        }
        throw new Error(`Unknown tab ${this.props.tab}`);
    }
    
    render() {
        return (
            <DrawerLayoutAndroid
                ref="drawer"
                drawerWidth={250}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={this.renderNavigationView}>
                <View style={styles.content}>
                    {this.renderContent()}
                </View>
            </DrawerLayoutAndroid>
        )
    } 
}

MainContainer.childContextTypes =  {
        openDrawer: React.PropTypes.func
};

function select(store) { //mapStateToProps from Redux
    //const { items, RecipeList } = state
    return {
        items: store.items,
        RecipeList: store.recipe,
        tab: store.navigation.tab
        //reduxState: state
    }
}

function actions(dispatch) { //mapDispatchToProps from Redux
    return {
        onTabSelect: (tab) => dispatch(switchTab(tab))        
    }
}

var styles = StyleSheet.create({
    drawer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    content: {
        flex: 1
    },
    drawerItem: {
        margin: 10, 
        fontSize: 15, 
        textAlign: 'center'
    }
});

export default connect(select, actions)(MainContainer)