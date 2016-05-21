import React from 'react-native'

let {
    StyleSheet,
    View,
    ToolbarAndroid,
    TextInput,
    Dimensions
} = React

let deviceWidth = Dimensions.get('window').width

import RecipeList from './RecipeList'
import {searchRecipes} from '../actions/recipe'
//import UserIngredientsView from './UserIngredientsView'

class Main extends React.Component {
    constructor (props) {
        super(props)
        
        this.state = {
            searchIngredients: ''
        }
        
        this.onIconClicked = this.onIconClicked.bind(this)
        this.onSubmitEditing = this.onSubmitEditing.bind(this)
            
    }
    
    onActionSelected (position) {
        return  
    }
    
    onIconClicked () {
        this.context.openDrawer();
        //this.setState({searchIngredients: 'onion'});
        // this.props.navigator.push({
        //     name: 'userIngredients',
        //     component: UserIngredientsView
        // });
    }
    
    onSubmitEditing () {
        const {dispatch} = this.props;
        let searchIngredients = this.state.searchIngredients;
        dispatch(searchRecipes(searchIngredients));
    }
    
    render () {
        //console.log('Main render called');
        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title="      食譜搜搜"
                    navIcon={require('../../assets/ic_menu_black_24dp.png')}
                    onIconClicked={this.onIconClicked}
                />
                <TextInput
                    style={styles.search}
                    onChangeText={(searchIngredients) => this.setState({searchIngredients})}
                    placeholder={'Type Any Ingredient '}
                    placeholderTextColor={'grey'}
                    underlineColorAndroid={'#3a3f41'}
                    onSubmitEditing={this.onSubmitEditing}
                    autoFocus={false}
                    autoCorrect={false}
                    value={this.state.searchIngredients}
                />
                <RecipeList {...this.props}/>
            
            </View>    
        )
        
    }
}

Main.contextTypes = {
    openDrawer: React.PropTypes.func
};

let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    toolbar: {
        backgroundColor: 'blue',
        height: 50
        //textAlign: 'center',
        //color: '#fff'
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //marginRight: 28,
        marginLeft: 58
    },
    search: {
        height: 50,
        //padding: 5,
        width: deviceWidth - 100,
        //color: '#fff',
        marginLeft: 50
    }
})

export default Main 