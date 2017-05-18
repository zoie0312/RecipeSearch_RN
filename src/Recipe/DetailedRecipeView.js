import React from 'react'
import ReactNative from 'react-native'
let {
    View,
    StyleSheet,
    Text,
    Image
} = ReactNative

class DetailedRecipeView extends React.Component{
    constructor (props) {
        super(props)
    }
    
    render () {
        const {title, image, sourceUrl, ingredientList} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <View style={styles.imageWrapper}>
					<Image
						source={{uri: image}}
						style={styles.recipeImage}
					/>
				</View>
                
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
		backgroundColor: '#F5FCFF'
    },
    recipeImage: {
		width: 360,
		height: 270
	},
});

export default DetailedRecipeView