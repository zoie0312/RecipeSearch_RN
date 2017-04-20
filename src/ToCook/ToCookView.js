import React from 'react'
import ReactNative from 'react-native'

import Swiper from 'react-native-swiper'

import IngredientItem from './IngredientItem'
import * as appdata from '../constants/AppData'

let {
    View,
    StyleSheet,
    Text,
    ToolbarAndroid,
    Image,
    Dimensions,
    ListView,
    TouchableHighlight,
    AsyncStorage
} = ReactNative

//const MOCKED_TOCOOKVIEW_DATA = appdata.MOCKED_TOCOOKVIEW_DATA

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

class IngredientList extends React.Component{
    constructor (props) {
        super(props)

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            ds: ds.cloneWithRows([])
        }

        this.renderIngredientRows = this.renderIngredientRows.bind(this)
    }

    renderIngredientRows (rowData, SectionID, rowID) {
        return (
            <IngredientItem
                name={rowData.name}
                key={rowData.name}
                isOwned={rowData.owned}
                highlight={rowData.highlight}
                onPressItem={this.props.onPressIngredient}
            />
                
        )
    }

    genIngredientRows (allIngredients, owned) {
        let dataBolb = [];
        Object.keys(allIngredients).forEach(name => {
            if (allIngredients[name].owned === owned) {
                dataBolb.push(allIngredients[name]);
            }
        });
        return dataBolb;
    }

    render () {
        var listDataSource = this.state.ds.cloneWithRows(this.genIngredientRows(this.props.ingredients, this.props.owned));
        if (Object.keys(this.props.ingredients).length === 0) {
            return (
                <View style={{flex: 1, borderWidth: 1}}>
                    <Text style={styles.ingredientListTitle}>{this.props.title}</Text>
                
                </View>
            )
        }
        return (
            <View style={{flex: 1, borderWidth: 1}}>
                <Text style={styles.ingredientListTitle}>{this.props.title}</Text>
                <ListView
                    style={styles.ingredientList}
                    dataSource={listDataSource}
                    renderRow={this.renderIngredientRows}
                    enableEmptySections={true}
                />
            </View>
        )
    }
}

class ToCookView extends React.Component{
    constructor (props) {
        super(props)
       
        this.state = {
            swiperIndex: 0,
            toCookRecipes: [],
        }

        this.renderSwiperContent = this.renderSwiperContent.bind(this)
        
        this.onPressIngredient = this.onPressIngredient.bind(this)
        this.swipeRecipe = this.swipeRecipe.bind(this)
    }

    getChildContext() {
        return {
            onPressIngredient: this.onPressIngredient,
        };
    }


    componentDidMount () {
        const me = this;
        const toCookRecipesKey = appdata.STORAGE_KEY_TOCOOKRECIPES;
        const userIngredientsKey = appdata.STORAGE_KEY_USERLOCALINGREDIENTS;
        try {
            
            AsyncStorage.multiGet([toCookRecipesKey, userIngredientsKey], (err, stores) => {
                let tempStore = {}
                let toCookRecipeList = []
                stores.map((result, i, store) => {
                    tempStore[store[i][0]] = JSON.parse(store[i][1])
                })
                Object.keys(tempStore[toCookRecipesKey]).forEach((key) => {
                    if(key !== 'zzzz' && tempStore[toCookRecipesKey][key].toCook) {
                        toCookRecipeList.push(tempStore[toCookRecipesKey][key])
                    }
                })
                me.setState({
                    toCookRecipes: toCookRecipeList,
                    userLocalIngredients: tempStore[userIngredientsKey] === '' ? {} : tempStore[userIngredientsKey]
                })
            });
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message)
        }
    }

    renderSwiperContent (swiperItems) {
        const me = this;
        let content

        content = swiperItems.map(function(item, idx, array) {
            return (
                <View style={styles.slide} key={idx+1}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.slideTitle}>{item.title}</Text>
                        <TouchableHighlight 
                            onPress={me.removeRecipe.bind(me, item)}
                            style={{marginLeft: 5}} 
                        >
                            <Image source={require('../../assets/ic_cancel_black_24dp.png')}/>
                        </TouchableHighlight>
                    </View>
                    <Image style={styles.slideImage} source={{uri: item.image}}/>
                </View>
            )
        });
        return content;
    }

    removeRecipe (targetRecipe) {
        let newCookRecipes = []
        this.state.toCookRecipes.forEach(function(recipe) {
            if (recipe.title !== targetRecipe.title) {
                newCookRecipes.push(recipe)
            }
        })

        let recipesDelta = {}
        recipesDelta[targetRecipe.title] = {toCook: false}
        AsyncStorage.mergeItem(appdata.STORAGE_KEY_TOCOOKRECIPES, JSON.stringify(recipesDelta), () => {} )

        this.setState({
            toCookRecipes: newCookRecipes,
            swiperIndex: 0
        })
    }

    onPressIngredient (alteredIgd) {
        let newCookRecipes = this.state.toCookRecipes
        let newUserLocalIngredients = this.state.userLocalIngredients
        newCookRecipes.forEach(function(rcp){
            rcp.ingredientList.forEach(function(igd){
                if(igd.text === alteredIgd.name){
                    igd.owned = !alteredIgd.isOwned
                    newUserLocalIngredients[igd.text] = !alteredIgd.isOwned
                }
            })
        })

        AsyncStorage.mergeItem(appdata.STORAGE_KEY_USERLOCALINGREDIENTS, JSON.stringify(newUserLocalIngredients), () => {})

        this.setState({
            toCookRecipes: newCookRecipes,
            userLocalIngredients: newUserLocalIngredients
        })
    }

    swipeRecipe (e, swiperState, context) {
        this.setState({
            swiperIndex: swiperState.index
        })
    }
    
    render () {
        var me = this;
        const swiperItems = this.state.toCookRecipes.map(recipeItem => {return {title: recipeItem.title, image: recipeItem.image}});
        let requiredIgds = {};
        this.state.toCookRecipes.forEach(function(recipe, idx, arr){
            recipe.ingredientList.forEach(function(ingredient, idx, igdArr) {
                if (!(ingredient.text in requiredIgds)) {
                    requiredIgds[ingredient.text] = {};
                    requiredIgds[ingredient.text]['name'] = ingredient.text;
                    requiredIgds[ingredient.text]['usedIn'] = new Set();
                    requiredIgds[ingredient.text]['owned'] = me.state.userLocalIngredients[ingredient.text] ? true : false;
                    requiredIgds[ingredient.text]['highlight'] = false;
                } 
                requiredIgds[ingredient.text].usedIn.add(recipe.title);
                requiredIgds[ingredient.text]['highlight'] = requiredIgds[ingredient.text].usedIn.has(me.state.toCookRecipes[me.state.swiperIndex].title) ? true : false 
            });
        });

        if (swiperItems.length < 2) { //to avoid problems of dynamic rendering a Swiper with less than 2 items 
            const dummyRecipe = {title: '目前沒有任何食譜', image: '../../assets/ic_autorenew_white_24dp.png'}
            const recipe = swiperItems.length === 1 ? swiperItems[0] : dummyRecipe
            return (
                <View style={styles.container}>
                    <View style={styles.singleSlide} >
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.slideTitle}>{recipe.title}</Text>
                            <TouchableHighlight 
                                onPress={me.removeRecipe.bind(me, recipe)}
                                style={{marginLeft: 5}} 
                            >
                                <Image source={swiperItems.length === 1? require('../../assets/ic_cancel_black_24dp.png') : require('../../assets/ic_autorenew_white_24dp.png')}/>
                            </TouchableHighlight>
                        </View>
                        <Image style={styles.slideImage} source={{uri: recipe.image}}/>
                    </View>
                    <View style={styles.ingredientsContainer}>
                        <Text style={styles.reqIgdsTitle}>所需食材</Text>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <IngredientList 
                                title="I have"
                                ingredients={requiredIgds}
                                owned={true}
                                onPressIngredient={this.onPressIngredient}
                            />
                            <IngredientList 
                                title="To Shop"
                                ingredients={requiredIgds}
                                owned={false}
                                onPressIngredient={this.onPressIngredient}
                            />
                        </View>
                        
                    </View>
                </View>
            )
        }else{ 
        
            return (
                <View style={styles.container}>
                    <Swiper 
                        height={deviceHeight * 0.5}
                        onMomentumScrollEnd={this.swipeRecipe}
                        showsButtons={true}>
                        {this.renderSwiperContent(swiperItems)}
                    </Swiper>
                    <View style={styles.ingredientsContainer}>
                        <Text style={styles.reqIgdsTitle}>所需食材</Text>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <IngredientList 
                                title="I have"
                                ingredients={requiredIgds}
                                owned={true}
                                onPressIngredient={this.onPressIngredient}
                            />
                            <IngredientList 
                                title="To Shop"
                                ingredients={requiredIgds}
                                owned={false}
                                onPressIngredient={this.onPressIngredient}
                            />
                        </View>
                    </View>
                </View>
                    
            )
        }
    }
}

ToCookView.childContextTypes =  {
        onPressIngredient: React.PropTypes.func
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    wrapper: {
    },
    ingredientsContainer: {
        flex: 1,
        width: deviceWidth,
        flexDirection: 'column'
    },
    reqIgdsTitle: {
        fontSize: 24,
        textAlign: 'center',
        lineHeight: 40
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    singleSlide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: deviceHeight * 0.5
    },
    slideTitle: {
        fontSize: 24
    },
    slideImage: {
        width: 345,
        height: 250
    },
    ingredientList: {
        flex: 1,
        borderWidth: 1
    },
    ingredientListTitle: {
        color: 'blue',
        fontSize: 16,
        fontWeight: 'bold', 
        height: 30,
        textAlign: 'center'
    },
    igdItemContainer: {
        padding: 10,
        flexDirection: 'row'
    }
});

export default ToCookView