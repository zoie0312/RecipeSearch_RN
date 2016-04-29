import React from 'react-native'

let {
    View,
    DrawerLayoutAndroid,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    Navigator
} = React

import {connect} from 'react-redux'

import Main from '../components/Main'
import UserIngredientsView from '../components/UserIngredientsView'

class MainContainer extends React.Component {
    props: {
        navigator: Navigator
    };
       
    constructor(props) {
        super(props);
        
        this.renderNavigationView = this.renderNavigationView.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
        //this.onPressItem = this.onPressItem.bind(this);
    }
    
    getChildContext() {
        return {
            openDrawer: this.openDrawer,
        };
    }
    
    openDrawer() {
        this.refs.drawer.openDrawer();
    }
    
    onPressItem(item: Item) {
        // this.refs.drawer.closeDrawer();
        // this.props.navigator.push({
        //     name: 'userIngredients',
        //     component: UserIngredientsView
        // });
    } 
    
    renderNavigationView() {
        return (
            <View style={styles.drawer}>
                <TouchableNativeFeedback
                    onPress={this.onPressItem.bind(this, 'user-ingredients')}>
                    <View style={{width: 150, height: 100, backgroundColor: 'red'}}>
                        <Text style={styles.drawerItem}>My Ingredients</Text>
                    </View>
                </TouchableNativeFeedback>
                <Text style={styles.drawerItem}>My Shopping List</Text>
                <Text style={styles.drawerItem}>Settings</Text>
            </View>
        )
    }
    
    render() {
        return (
            <DrawerLayoutAndroid
                ref="drawer"
                drawerWidth={250}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={this.renderNavigationView}>
                <View style={styles.content}>
                    <Main {...this.props} />
                </View>
            </DrawerLayoutAndroid>
        )
    } 
}

MainContainer.childContextTypes =  {
        openDrawer: React.PropTypes.func
};

function mapStateToProps(state) {
    const { items, RecipeList } = state
    return {
        items,
        RecipeList
        //reduxState: state
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

export default connect(mapStateToProps)(MainContainer)