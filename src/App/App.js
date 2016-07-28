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
import {STORAGE_KEY} from "../constants/AppData"
import DetailedRecipeView from '../Recipe/DetailedRecipeView'

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
            var value = await AsyncStorage.getItem(STORAGE_KEY);
            if (value === null) {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({}));
            }
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
                        <Scene key="detailrecipe" component={DetailedRecipeView}/>
                    </Scene>
                    <Scene key="error"/>
                </Scene>
            </Router>
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