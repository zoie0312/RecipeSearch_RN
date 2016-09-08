import React from 'react'
import ReactNative from 'react-native'
import Button from 'react-native-button'
import Modal from 'react-native-modalbox'

let {
    View,
    StyleSheet,
    Text,
    Image,
    ToolbarAndroid,
    Dimensions,
    Animated,
    Easing,
    WebView
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
            notOwned:false,
            text:"板豆腐"
        },
        {
            notOwned:false,
            text: "絞肉"
        },
        {
            notOwned:false,
            text: "蒜末"
        },
        {
            notOwned:false,
            text: "蔥"
        },
        {
            notOwned:false,
            text: "辣豆瓣醬"
        },
        {
            notOwned:false,
            text: "醬油"
        },
        {
            notOwned:false,
            text: "糖"
        },
        {
            notOwned:false,
            text: "水"
        },
        {
            notOwned:false,
            text: "太白粉"
        },
        {
            notOwned:false,
            text: "香油"
        },
        {
            notOwned:false,
            text: "水"
        }
    ]
}

class RequiredIgds extends React.Component {
	constructor (props) {
        super(props)
    }
    
    render () {
		//const {ingredientList} = this.props
        const {ingredientList} = MOCKED_DATA
		let	igdLen = ingredientList.length;
		return (
			<Text style={styles.ingredients}>
				所需食材: &nbsp;
				{ingredientList.map(function(ingredient, i){
					return (i === (igdLen-1) ? <Text key={i}>{ingredient.text}</Text> : <Text key={i}>{ingredient.text + '、'}</Text>)

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
            //sourceVisible: false
        };
        this.onIconClicked = this.onIconClicked.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.sourceLoadFinish = this.sourceLoadFinish.bind(this);
    }

    onIconClicked () {
        console.log('onIconClicked');
        const {title, image, sourceUrl, ingredientList} = MOCKED_DATA;
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
                    //sourceLoaded: true,
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

    openModal () {
        console.log('open modal called');
        const {title, image, sourceUrl, ingredientList} = MOCKED_DATA;
        this.setState(
            {
                isOpen: true,
                url: sourceUrl
            }
        );
    }

    closeModal () {
        this.setState({isOpen: false});
    }

    sourceLoadFinish () {
        this.setState(
            {
                iconUrl: sourceCollapseIcon,
                sourceLoaded: true
            }
        );
    }
    
    render () {
        //const {title, image, sourceUrl, ingredientList} = this.props;
        const {title, image, sourceUrl, ingredientList} = MOCKED_DATA;

        var BContent = <Button onPress={this.closeModal} style={[styles.btn, styles.btnModal]}>XXXXXXX</Button>;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <View 
                    style={styles.imageWrapper}>
					<Image
						source={{uri: image}}
						style={styles.recipeImage}
					/>
				</View>
                {/*<RequiredIgds
                    {...this.props}/>*/}
                <RequiredIgds/>
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
                            height: deviceHeight,
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
        height: deviceHeight
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