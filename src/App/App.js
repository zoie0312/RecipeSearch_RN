import React from 'react'
import ReactNative from 'react-native'

let {
    StyleSheet,
    BackAndroid,
    AsyncStorage
} = ReactNative

import {connect} from 'react-redux'
import {Scene, Router, Modal} from 'react-native-router-flux'

import Main from './Main'
import switchTab from '../actions/navigation'
import {STORAGE_KEY_USERLOCALINGREDIENTS, STORAGE_KEY_TOCOOKRECIPES} from "../constants/AppData"
import RecipeView from '../Recipe/RecipeView'

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
        this.initialize().done();
    }

    async initialize() {
        // initialize App-wise data
        try {
            AsyncStorage.multiGet([STORAGE_KEY_USERLOCALINGREDIENTS, STORAGE_KEY_TOCOOKRECIPES], (err, stores) => {
                stores.map((result, i, store) => {
                    if (store[i][1] === null) {
                        AsyncStorage.setItem(store[i][0], JSON.stringify({zzzz:{fhdlsjf:47521}}))
                    }
                    
                })
            });
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }
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


	render () {

        return (
            <Router>
                <Scene key="modal" component={Modal}>
                    <Scene key="root" hideNavBar={true}>
                        <Scene key="main" component={Main} initial={true} hideNavBar={true}/>
                        <Scene key="detailrecipe" component={RecipeView}/>
                    </Scene>
                    <Scene key="error"/>
                </Scene>
            </Router>
        )
        /*return (
            <Router>
                <Scene key="modal" component={Modal}>
                    <Scene key="root" hideNavBar={true}>
                        <Scene key="main" component={Main} hideNavBar={true}/>
                        <Scene key="detailrecipe" component={RecipeView} initial={true}/>
                    </Scene>
                    <Scene key="error"/>
                </Scene>
            </Router>
        )*/
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