import React from 'react'
import ReactNative from 'react-native'
import {connect} from 'react-redux'

import HomeView from '../Home/HomeView'
import UserIngredientsView from '../UserIngredients/UserIngredientsView'
import ToCookView from '../ToCook/ToCookView'
import MenuItem from './MenuItem'
import switchTab from '../actions/navigation'
import MOCKED_INGREDIENT_DATA from '../constants/IngredientData1'

let {
    View,
    DrawerLayoutAndroid,
    StyleSheet,
    Text
} = ReactNative

class Main extends React.Component {
       
    constructor(props) {
        super(props);
        
        this.renderNavigationView = this.renderNavigationView.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
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
    } 
    
    renderNavigationView() {
        return (
            <View style={styles.drawer}>
                <MenuItem
                    title="首頁"
                    onPress={this.onTabSelect.bind(this, 'Home')}
                />
                <MenuItem
                    title="我的食材"
                    textStyle={{opacity: 0.3}}
                    onPress={/*this.onTabSelect.bind(this, 'User Ingredients')*/ ooxx => {}}
                />
                <MenuItem
                    title="料理清單"
                    onPress={this.onTabSelect.bind(this, 'User ToCook List')}
                />
                <MenuItem
                    title="設定"
                    textStyle={{opacity: 0.3}}
                    onPress={/*this.onTabSelect.bind(this, 'Settings')*/ ooxx => {}}
                />    
            </View>
        )
    }
    
    renderContent() {
        const {tab} = this.props;
        switch (tab) {
            case 'Home':
                return (
                    <HomeView/>
                );
                
            case 'User Ingredients': 
                return (
                    <UserIngredientsView 
                        tab={tab}
                        path=''
                        initialListData={MOCKED_INGREDIENT_DATA}
                    />
                );
                
            case 'User ToCook List':
                return (
                    <ToCookView {...this.props} />
                );
                
            case 'Settings':
                return;
        }
        throw new Error(`Unknown tab ${tab}`);
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

Main.childContextTypes =  {
        openDrawer: React.PropTypes.func
};

function select(state) { //mapStateToProps from Redux
    //const { items, RecipeList } = state
    return {
        RecipeList: state.recipe,
        tab: state.navigation.tab
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

export default connect(select, actions)(Main)