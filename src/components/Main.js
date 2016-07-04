import React from 'react'
import ReactNative from 'react-native'

let {
    StyleSheet,
    View,
    ToolbarAndroid,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Text
} = ReactNative

let deviceWidth = Dimensions.get('window').width

import RecipeList from './RecipeList'
import {searchRecipes} from '../actions/recipe'
import {connect} from 'react-redux'
import Autocomplete from 'react-native-autocomplete-input'
//import UserIngredientsView from './UserIngredientsView'
import updateSearchText from '../actions/search'

var MOCKED_INGREDIENTS = ["豬絞肉", "牛絞肉", "豬肉片", "南瓜", "玉米", "碗豆", "冬瓜", "蓮子", "番茄"]

class Main extends React.Component {
    constructor (props) {
        super(props)
        
        this.onIconClicked = this.onIconClicked.bind(this)
        this.onSubmitEditing = this.onSubmitEditing.bind(this)
        this.renderAutocompleteList = this.renderAutocompleteList.bind(this)
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
    
    filterIngredients(query) {
        if (query === ''){
            return [];
        }
        return MOCKED_INGREDIENTS.filter(igd => igd.indexOf(query) >= 0 );
    }
    
    renderAutocompleteList (data) {
        return (
            <TouchableOpacity
                onPress={this.pickIngredient.bind(this, data)}
            >
                <Text>{data}</Text>
            </TouchableOpacity>
        )
    }
    
    pickIngredient (ingredient) {
       this.props.dispatch(updateSearchText(ingredient));
    }
    
    render () {
        const { searchText } = this.props;
        const filteredIngredients = this.filterIngredients(searchText);
        var displayedIngredients;
        if (filteredIngredients.length === 1 && searchText.trim() === filteredIngredients[0].trim()) {
            displayedIngredients = [];
        }else {
            displayedIngredients = filteredIngredients;
        }
        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    style={styles.toolbar}
                    title="      食譜搜搜"
                    navIcon={require('../../assets/ic_menu_black_24dp.png')}
                    onIconClicked={this.onIconClicked}
                />
                {/*<TextInput
                    style={styles.search}
                    onChangeText={(searchIngredients) => this.setState({searchIngredients})}
                    placeholder={'Type Any Ingredient '}
                    placeholderTextColor={'grey'}
                    underlineColorAndroid={'#3a3f41'}
                    onSubmitEditing={this.onSubmitEditing}
                    autoFocus={false}
                    autoCorrect={false}
                    value={this.state.searchIngredients}
                />*/}
                <View style={styles.recipesContainer}>
                    <RecipeList
                        {...this.props}
                    />
                </View>
                <Autocomplete
                    placeholder="Type Any Ingredient "
                    containerStyle={styles.autocompleteContainer}
                    data={displayedIngredients}
                    defaultValue={searchText}
                    onChangeText={text => this.props.dispatch(updateSearchText(text))}
                    renderItem={this.renderAutocompleteList} 
                />
                
            
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
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 58
    },
    search: {
        height: 50,
        width: deviceWidth - 100,
        marginLeft: 50
    },
    autocompleteContainer: {
        flex: 1,
        top: 50,
        position: 'absolute',
        width: deviceWidth - 100,
        marginLeft: 50
    },
    recipesContainer: {
        paddingTop: 60
    }
})

function select(store) { //mapStateToProps from Redux
    return {
        searchText: store.search.searchText
    }
}

export default connect(select)(Main) 