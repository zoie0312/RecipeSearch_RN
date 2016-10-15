import React from 'react'
import ReactNative from 'react-native'
import {connect} from 'react-redux'
import Autocomplete from 'react-native-autocomplete-input'

import RecipeList from './RecipeList'
import {searchRecipes, displaySearch, fetchRecipes} from '../actions/recipe'
import {updateSearchText} from '../actions/search'
import ALL_SEARCHABLE_INGREDIENTS from '../constants/SearchableIngredients'
import {STORAGE_KEY_USERNAME} from '../constants/AppData'

let {
    StyleSheet,
    View,
    ToolbarAndroid,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Text,
    AsyncStorage
} = ReactNative

const deviceWidth = Dimensions.get('window').width

class HomeView extends React.Component {
    constructor (props) {
        super(props)
        
        this.onIconClicked = this.onIconClicked.bind(this)
        this.onSubmitEditing = this.onSubmitEditing.bind(this)
        this.renderAutocompleteList = this.renderAutocompleteList.bind(this)
        this.pickIngredient = this.pickIngredient.bind(this)
    }
    
    onActionSelected (position) {
        return  
    }
    
    onIconClicked () {
        this.context.openDrawer();
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
        return ALL_SEARCHABLE_INGREDIENTS.filter(igd => igd.text.indexOf(query) >= 0 );
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
        this.props.dispatch(searchRecipes({
            username: this._username,
            ingredient: ingredient.id
        }));
    }
    
    componentWillMount () {
        var me = this;
        try {
            AsyncStorage.getItem(STORAGE_KEY_USERNAME, (err, result) => {
                me._username = result === null? '' : JSON.parse(result);
            });
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message)
        }
    }
    
    componentDidMount () {
        const { searchText } = this.props;
        //if (searchText !== '') {
        //    this.props.dispatch(fetchRecipes());
        //}
        
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
                    <RecipeList/>
                </View>
                <Autocomplete
                    placeholder="輸入食材名稱 "
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

HomeView.contextTypes = {
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

export default connect(select)(HomeView) 