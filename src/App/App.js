import React from 'react'
import ReactNative from 'react-native'

let {
    Navigator,
    StyleSheet,
    BackAndroid
} = ReactNative

import {connect} from 'react-redux'

import Root from './Root'
import switchTab from '../actions/navigation'

var MOCKED_RECIPE_DATA = [
  {
  	title: '宮保雞丁',
  	ingredient_list: ['雞胸肉', '醬油膏', '蒜頭', '乾辣椒', '蔥'],
  	image: 'https://dbjdsnch130xu.cloudfront.net/uploads/recipe/cover/129209/large_fd890f1d7f58519d.jpg'
  }
];

class App extends React.Component { //this serves as the root container of App
    
    constructor(props) {
        super(props);
        
        this._handlers = [];
        
        this.handleBackButton = this.handleBackButton.bind(this);
        this.addBackButtonListener = this.addBackButtonListener.bind(this);
        this.removeBackButtonListener = this.removeBackButtonListener.bind(this);
    }
    
    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    
    getChildContext() {
        return {
            addBackButtonListener: this.addBackButtonListener,
            removeBackButtonListener: this.removeBackButtonListener,
        };
    }
    
    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    
    addBackButtonListener(listener) {
        this._handlers.push(listener);
    }

    removeBackButtonListener(listener) {
        this._handlers = this._handlers.filter((handler) => handler !== listener);
    }
    
    handleBackButton() {
        for (let i = this._handlers.length - 1; i >= 0; i--) {
            if (this._handlers[i]()) {
                return true;
            }
        }
        if (this.props.tab !== 'Home') {
            this.props.dispatch(switchTab('Home'));
            return true;
        }
        
        return false;
    }
    
    renderScene(route, navigator) {
        let Component = route.component
        
        return (
            <Component navigator={navigator} route={route} />
        )
    }
    
    configureScene(route) {
         
        if (route.name === 'Recipe Detail') {
            return Navigator.SceneConfigs.PushFromRight;
        }
        return Navigator.SceneConfigs.PushFromRight;
    }
    
	render () {
        
        return (
            <Navigator
                ref="navigator"
                style={styles.container}
                configureScene={this.configureScene}  
                renderScene={this.renderScene}
                initialRoute={{
                    component: Root,
                    name: 'Main'
                }}
            />
        )
	}
}

App.childContextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func,
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
});

function select(state) {
    return {
        tab: state.navigation.tab
    }
}

module.exports = connect(select)(App)