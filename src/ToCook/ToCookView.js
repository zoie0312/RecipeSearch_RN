import React from 'react'
import ReactNative from 'react-native'

import Swiper from 'react-native-swiper'

import IngredientItem from './IngredientItem'

let {
    View,
    StyleSheet,
    Text,
    ToolbarAndroid,
    Image,
    Dimensions,
    ListView,
    TouchableHighlight
} = ReactNative

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

var MOCKED_DATA = [
    {
        title: "蛤蜊蒸蛋",
        image: "https://dbjdsnch130xu.cloudfront.net/uploads/recipe/cover/152225/large_1c5aa8124b3b8527.jpg",
        ingredientList: [
            
            {
                "text": "青蔥",
                "id": 174,
                "owned": false
            },
            {
                "text": "豆瓣醬",
                "id": 270,
                "owned": false
            },
            {
                "text": "醬油",
                "id": 278,
                "owned": false
            },
            {
                "text": "砂糖",
                "id": 299,
                "owned": false
            },
            {
                "text": "水",
                "id": 430,
                "owned": false
            },
            {
                "text": "太白粉",
                "id": 343,
                "owned": false
            },
            {
                "text": "香油",
                "id": 391,
                "owned": false
            }
        ]
    },
    {
        title: "肉絲炒龍鬚菜",
        image: "https://dbjdsnch130xu.cloudfront.net/uploads/recipe/cover/171094/large_850ae9d829e75f96.jpg",
        ingredientList: [
            {
                "text": "豆腐",
                "id": 409,
                "owned": false
            },
            {
                "text": "豬絞肉",
                "id": 7,
                "owned": false
            },
            
            {
                "text": "砂糖",
                "id": 299,
                "owned": false
            },
            {
                "text": "水",
                "id": 430,
                "owned": false
            },
            {
                "text": "太白粉",
                "id": 343,
                "owned": false
            },
            {
                "text": "香油",
                "id": 391,
                "owned": false
            }
        ]
    },
    {
        title: "【哇菜影音食譜】魚香豆腐",
        image: "https://dbjdsnch130xu.cloudfront.net/uploads/recipe/cover/32946/large_aa4b86e5608db954.jpg",
        ingredientList: [
            {
                "text": "豆腐",
                "id": 409,
                "owned": false
            },
            {
                "text": "豬絞肉",
                "id": 7,
                "owned": false
            },
            {
                "text": "大蒜",
                "id": 186,
                "owned": false
            },
            {
                "text": "青蔥",
                "id": 174,
                "owned": false
            },
            {
                "text": "豆瓣醬",
                "id": 270,
                "owned": false
            },
            {
                "text": "醬油",
                "id": 278,
                "owned": false
            },
            {
                "text": "砂糖",
                "id": 299,
                "owned": false
            }
            
        ]
    }
]

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
        return (
            <View style={{flex: 1, borderWidth: 1}}>
                <Text style={styles.ingredientListTitle}>{this.props.title}</Text>
                <ListView
                    style={styles.ingredientList}
                    dataSource={listDataSource}
                    renderRow={this.renderIngredientRows}
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

    componentWillMount () {
        this.setState({
            toCookRecipes: MOCKED_DATA
        })
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
        //console.log('removeRecipe called');
        let newCookRecipes = []
        this.state.toCookRecipes.forEach(function(recipe) {
            if (recipe.title !== targetRecipe.title) {
                newCookRecipes.push(recipe)
            }
        })

        this.setState({
            toCookRecipes: newCookRecipes,
            swiperIndex: 0
        })
    }

    onPressIngredient (alteredIgd) {
        var newCookRecipes = this.state.toCookRecipes
        newCookRecipes.forEach(function(rcp){
            rcp.ingredientList.forEach(function(igd){
                if(igd.text === alteredIgd.name){
                    igd.owned = !alteredIgd.isOwned
                }
            })
        })
        this.setState({
            toCookRecipes: newCookRecipes
        })
    }

    swipeRecipe (e, swiperState, context) {
        //console.log('swipeRecipe called ' + swiperState.index)
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
                    requiredIgds[ingredient.text]['owned'] = ingredient.owned;
                    requiredIgds[ingredient.text]['highlight'] = false;
                } 
                requiredIgds[ingredient.text].usedIn.add(recipe.title);
                requiredIgds[ingredient.text]['highlight'] = requiredIgds[ingredient.text].usedIn.has(me.state.toCookRecipes[me.state.swiperIndex].title) ? true : false 
            });
        });

        if (swiperItems.length < 2) {
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