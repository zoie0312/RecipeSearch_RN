import React from 'react'
import ReactNative from 'react-native'
import {connect} from 'react-redux'
import Autocomplete from 'react-native-autocomplete-input'

import RecipeList from './RecipeList'
import {searchRecipes, displaySearch, fetchRecipes} from '../actions/recipe'
import updateSearchText from '../actions/search'

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

var MOCKED_INGREDIENTS = [
    {
        "text": "豬絞肉",
        "id": 7
    },
    { 
        "text": "牛絞肉",
        "id": 21
    },
    {
        "text": "豬肉片",
        "id": 445
    },
    {
        "text": "南瓜",
        "id": 127
    },
    {
        "text": "玉米",
        "id": 141,
    },
    {
        "text": "碗豆",
        "id": 147
    },
    {
        "text": "冬瓜",
        "id": 743
    },
    {
        "text": "蓮子",
        "id": 755
    },
    {
        "text": "番茄",
        "id": 121
    }
]

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
        return MOCKED_INGREDIENTS.filter(igd => igd.text.indexOf(query) >= 0 );
    }
    
    renderAutocompleteList (data) {
        return (
            <TouchableOpacity
                onPress={this.pickIngredient.bind(this, data)}
            >
                <Text>{data.text}</Text>
            </TouchableOpacity>
        )
    }
    
    pickIngredient (ingredient) {
       this.props.dispatch(updateSearchText(ingredient.text));
       this.props.dispatch(searchRecipes(ingredient.id));
    }
    
    componentDidMount () {
        console.log('Main component componentDidMount called');
        const { searchText } = this.props;
        if (searchText !== '') {
            //this.props.dispatch(displaySearch(searchText));
            this.props.dispatch(fetchRecipes());
        }
        
    }
    
    render () {
        const { searchText } = this.props;
        const filteredIngredients = this.filterIngredients(searchText);
        var displayedIngredients;
        if (filteredIngredients.length === 1 && searchText.trim() === filteredIngredients[0].text.trim()) {
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
        paddingTop: 60,
        flex: 1
    }
})

function select(store) { //mapStateToProps from Redux
    return {
        searchText: store.search.searchText
    }
}

export default connect(select)(Main) 