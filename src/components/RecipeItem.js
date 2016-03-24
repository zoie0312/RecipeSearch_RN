import React from 'react-native'

let {
	StyleSheet,
	Text,
	Image,
	View,
} = React


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
    }
    
	render () {
		const {title, image} = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.title}>
					{title}
				</Text>
				<View style={styles.imageWrapper}>
					<Image
						//resizeMode='contain'
						source={{uri: image}}
						style={styles.recipeImage}
					/>
				</View>
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