import React from 'react'
import ReactNative from 'react-native'
let {
	StyleSheet,
	Text,
	Image,
	View,
    TouchableNativeFeedback
} = ReactNative


import Recipe from '../Recipe/Recipe'

class RequiredIgds extends React.Component {
	constructor (props) {
        super(props)
    }
    
    render () {
		const {ingredient_list} = this.props
		let	igdLen = ingredient_list.length;
		return (
			<Text style={styles.ingredients}>
				所需食材: &nbsp;
				{ingredient_list.map(function(ingredient, i){
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
        console.log('recipe image pressed');
        this.props.navigator.push({
            name: 'recipeDetail',
            component: Recipe
        })
    }
    
	render () {
		const {title, image} = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.title}>
					{title}
				</Text>
                <TouchableNativeFeedback
                    onPress={this.onPressRecipeImage}>
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