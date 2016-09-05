import React from 'react'
import ReactNative from 'react-native'
let {
    View,
    StyleSheet,
    Text,
    Image,
    ToolbarAndroid,
    Dimensions,
    Animated,
    Easing
} = ReactNative

let deviceHeight = Dimensions.get('window').height
let deviceWidth = Dimensions.get('window').width

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
            shrinkValue: new Animated.Value(0)
        };
        this.onIconClicked = this.onIconClicked.bind(this);
    }

    onIconClicked () {
        console.log('onIconClicked');
        Animated.timing(
            this.state.shrinkValue,
            {
                toValue: -200,
                easing: Easing.bounce
            }
        ).start();
    }
    
    render () {
        //const {title, image, sourceUrl, ingredientList} = this.props;
        const {title, image, sourceUrl, ingredientList} = MOCKED_DATA;
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
                    <ToolbarAndroid
                        style={styles.toolbar}
                        title="    詳細作法"
                        navIcon={require('../../assets/ic_menu_black_24dp.png')}
                        onIconClicked={this.onIconClicked}
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
        textAlign: 'right'
    },
    imageWrapper: {
        alignItems: 'center',
		//backgroundColor: '#F5FCFF'
        backgroundColor: 'yellow',
        height: deviceHeight * 0.4
    },
    recipeImage: {
		width: 360,
		height: deviceHeight * 0.4
	},
    ingredients: {
        //flex: 1
    },
    toolbar: {
        backgroundColor: 'blue',
        height: 40
    },
    sourceContainer: {
        flex: 1,
        backgroundColor: 'green',
        width: deviceWidth,
        //height: deviceHeight * 0.3
    }
});

export default RecipeView