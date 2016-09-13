import React from 'react'
import ReactNative from 'react-native'
let {
	StyleSheet,
	Text,
	Image,
	View,
    TouchableNativeFeedback
} = ReactNative
import {Actions} from 'react-native-router-flux'

class RequiredIgds extends React.Component {
	constructor (props) {
        super(props)
    }
    
    render () {
		const {ingredientList} = this.props
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

class RecipeItem extends React.Component {
    constructor (props) {
        super(props)
        
        this.onPressRecipeImage = this.onPressRecipeImage.bind(this);
    }
    
    onPressRecipeImage () {
        //console.log('recipe image pressed');
        
        Actions.detailrecipe(this.props);
    }
    
	render () {
    var me = this;
		const {title, image} = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.title}>
					{title}
				</Text>
                <TouchableNativeFeedback
                    onPress={this.onPressRecipeImage.bind(me)}>
				<View style={styles.imageWrapper}>
					<Image
						//resizeMode='contain'
						source={{uri: image}}
						style={styles.recipeImage}
					/>
				</View>
                </TouchableNativeFeedback>
				<RequiredIgds
                    {...this.props}/>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		//alignItems: 'center',
		backgroundColor: '#F5FCFF',
		//position: 'relative'
	},
	title: {
		fontSize: 18,
	},
	imageWrapper: {
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	recipeImage: {
		width: 360,
		height: 270
	},
	ingredients: {

	}
});

export default RecipeItem