import React from 'react'
import ReactNative from 'react-native'

let {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableHighlight
} = ReactNative

class IngredientItem extends React.Component{
    constructor (props) {
        super(props)
    }


    getIgdContainerStyle (hightlight) {
        if (hightlight) {
            return {
                padding: 10,
                flexDirection: 'row',
                backgroundColor: 'yellow'
            }
        } else {
            return {
                padding: 10,
                flexDirection: 'row'
            }
        }
    }

    onPressItem () {
        //console.log('IngredientItem onPressItem')
        this.context.onPressIngredient(this.props);
    }

    render () {
        return (
            <TouchableHighlight onPress={this.onPressItem.bind(this)} >
                <View style={this.getIgdContainerStyle(this.props.highlight)}>
                    <Text style={styles.igdItemText} >{this.props.name}</Text>
                    <Image source={require('../../assets/ic_keyboard_arrow_right_black_24dp.png')}/>
                </View>
            </TouchableHighlight>
        )
    }
}

IngredientItem.contextTypes = {
    onPressIngredient: React.PropTypes.func
};

var styles = StyleSheet.create({
    igdItemText: {
        textAlign: 'left',
        fontSize: 14,
        fontWeight: '500'
    }
})

export default IngredientItem