import React from 'react'
import ReactNative from 'react-native'
import Button from 'react-native-button'
import Modal from 'react-native-modalbox'
import {Actions} from 'react-native-router-flux'
import * as appdata from '../constants/AppData'

let {
    View,
    StyleSheet,
    Text,
    Image,
    ToolbarAndroid,
    Dimensions,
    Animated,
    Easing,
    WebView,
    AsyncStorage,
    ToastAndroid,
    TouchableHighlight
} = ReactNative

var deviceHeight = Dimensions.get('window').height
var deviceWidth = Dimensions.get('window').width
let initialGap = (deviceHeight - (deviceHeight * 0.1)) - 40 - (deviceHeight * 0.4) - 70 - 65
let initialIcon = require('../../assets/ic_autorenew_white_24dp.png')
let sourceLoadingIcon = require('../../assets/reload.gif')
let sourceExpandIcon = require('../../assets/ic_expand_less_black_24dp.png')
let sourceCollapseIcon = require('../../assets/ic_expand_more_black_24dp.png')

var MOCKED_DATA = {
    smallImage: "https://dbjdsnch130xu.cloudfront.net/uploads/recipe/cover/32946/small_aa4b86e5608db954.jpg",
    sourceUrl: "https://icook.tw/recipes/32946",
    title: "【哇菜影音食譜】魚香豆腐",
    image: "https://dbjdsnch130xu.cloudfront.net/uploads/recipe/cover/32946/large_aa4b86e5608db954.jpg",
    ingredientList: [
        {
            "text": "豆腐",
            "leaf": true,
            "id": 409,
            "owned": false
        },
        {
            "text": "豬絞肉",
            "leaf": true,
            "id": 7,
            "owned": false
        },
        {
            "text": "大蒜",
            "leaf": true,
            "id": 186,
            "owned": false
        },
        {
            "text": "青蔥",
            "leaf": true,
            "id": 174,
            "owned": false
        },
        {
            "text": "豆瓣醬",
            "leaf": true,
            "id": 270,
            "owned": false
        },
        {
            "text": "醬油",
            "leaf": true,
            "id": 278,
            "owned": false
        },
        {
            "text": "砂糖",
            "leaf": true,
            "id": 299,
            "owned": false
        },
        {
            "text": "水",
            "leaf": true,
            "id": 430,
            "owned": false
        },
        {
            "text": "太白粉",
            "leaf": true,
            "id": 343,
            "owned": false
        },
        {
            "text": "香油",
            "leaf": true,
            "id": 391,
            "owned": false
        },
        {
            "text": "水",
            "leaf": true,
            "id": 430,
            "owned": false
        }
    ]
}

class RequiredIgds extends React.Component {
	constructor (props) {
        super(props)

        this.state = {
            localUserIngredients: ''
        }
    }

    componentWillMount () {
        var me = this;
        try {
            AsyncStorage.getItem(appdata.STORAGE_KEY_USERLOCALINGREDIENTS, (err, result) => {
                me.setState({ 
                    localUserIngredients : JSON.parse(result)
                });
            });
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message)
        }
    }
    
    render () {
		//const {ingredientList} = MOCKED_DATA
        const {ingredientList} = this.props
		let	igdLen = ingredientList.length;
        var me = this; 
		if (me.state.localUserIngredients === '') {
            return (
                <Text style={styles.ingredients}>
				    所需食材: &nbsp;
                </Text>
            )
        }
        return (
			<Text style={styles.ingredients}>
				所需食材: &nbsp;
				{ingredientList.map(function(ingredient, i){
                    if (me.state.localUserIngredients[ingredient.text] === true) {
                        return (i === (igdLen-1) ? <Text key={i}>{ingredient.text}</Text> : <Text key={i}>{ingredient.text + '、'}</Text>)
                    } else {
                        return (i === (igdLen-1) ? <Text key={i} style={{color: 'red'}}>{ingredient.text}</Text> : <Text key={i} style={{color: 'red'}}>{ingredient.text + '、'}</Text>)
                    }

				})}
			</Text>
		)

	}
}

class RecipeView extends React.Component{
    constructor (props) {
        super(props);
        this.state = {  
            shrinkValue: new Animated.Value(0),
            isOpen: false,
            url: '',
            sourceLoaded: false,
            gap: initialGap,
            iconUrl: initialIcon
        };
        this.onIconClicked = this.onIconClicked.bind(this);
        this.sourceLoadFinish = this.sourceLoadFinish.bind(this);
        this.addRecipe = this.addRecipe.bind(this);
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    componentDidMount () {
        this.context.addBackButtonListener(this.handleBackButton);
    }

    componentWillUnmount () {
        this.context.removeBackButtonListener(this.handleBackButton);
    }

    handleBackButton () {
        this.context.removeBackButtonListener(this.handleBackButton)
        Actions.main();
        return true;
    }

    onIconClicked () {
        //const {title, image, sourceUrl, ingredientList} = MOCKED_DATA;
        const {title, image, sourceUrl, ingredientList} = this.props;
        if (this.state.sourceLoaded) {
            this.setState(
                {
                    gap: this.state.gap === 0 ? initialGap : 0,
                    iconUrl: this.state.gap === 0 ? sourceExpandIcon : sourceCollapseIcon
                }
            );
            
        } else {
            this.setState(
                {
                    url: sourceUrl,
                    gap: 0,
                    iconUrl: sourceLoadingIcon
                }
            );
            
        }
        Animated.timing(
            this.state.shrinkValue,
            {
                toValue: (this.state.shrinkValue._value === 0)? -250 : 0,
                easing: Easing.bounce
            }
        ).start();
    }

    sourceLoadFinish () {
        this.setState(
            {
                iconUrl: sourceCollapseIcon,
                sourceLoaded: true
            }
        );
    }

    addRecipe = () => {
        //const {title, image, sourceUrl, ingredientList} = MOCKED_DATA;
        const {title, image, sourceUrl, ingredientList} = this.props;
        let updateValue = {}
        updateValue[title] = {
            title: title,
            image: image,
            ingredientList: ingredientList,
            toCook: true
        }
        ToastAndroid.show(title + ' 加到料理清單', ToastAndroid.SHORT)
        AsyncStorage.mergeItem(appdata.STORAGE_KEY_TOCOOKRECIPES, JSON.stringify(updateValue), () => {
            //console.log('add recipe for using later')
        });     
    }
    
    render () {
        //const {title, image, sourceUrl, ingredientList} = MOCKED_DATA;
        const {title, image, sourceUrl, ingredientList} = this.props;
        const me = this;

        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <TouchableHighlight 
                        onPress={me.addRecipe}
                        style={{marginLeft: 5}} 
                    >
                        <Image source={require('../../assets/ic_add_circle_black_24dp.png')}/>
                    </TouchableHighlight>
                </View>
                <View 
                    style={styles.imageWrapper}>
					<Image
						source={{uri: image}}
						style={styles.recipeImage}
					/>
				</View>
                <RequiredIgds
                    {...this.props}/>
                <Animated.View 
                    style={[styles.sourceContainer, {
                        transform: [{
                            translateY: this.state.shrinkValue
                        }]
                    }]}>
                    
                    <Button 
                        containerStyle={styles.btnContainer}
                        onPress={this.onIconClicked}
                        style = {styles.btn}
                    >
                        詳細作法
                        <Image 
                            style={styles.icon} 
                            source={this.state.iconUrl}
                        />
                    </Button>
                    <WebView 
                        style={{
                            top: this.state.gap
                        }}
                        source={{uri: this.state.url}}
                        scalesPageToFit={false}
                        onLoad={this.sourceLoadFinish}
                    />
                    
                </Animated.View>
            </View>
                
        )
    }
}

RecipeView.contextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    title: {
        margin: 10,
        fontSize: 15,
        textAlign: 'right',
        height: 20
    },
    imageWrapper: {
        alignItems: 'center',
        backgroundColor: 'yellow',
        height: deviceHeight * 0.4
    },
    recipeImage: {
		width: 360,
		height: deviceHeight * 0.4
	},
    ingredients: {
        margin: 10,
        height: 50
    },
    sourceContainer: {
        backgroundColor: 'white',
        width: deviceWidth,
        height: deviceHeight * 0.75
    },
    btnContainer: {
        alignItems: 'center', 
        margin: 10, 
        height:45, 
        overflow:'hidden', 
        borderRadius:4, 
        backgroundColor: '#3B5998'
    },
    btn: {
        marginTop: 10,
        backgroundColor: '#3B5998',
        color: 'white',
        textAlignVertical: 'center'
    },
    icon: {
        marginLeft: 50, 
        marginTop: 10
    }
});

export default RecipeView