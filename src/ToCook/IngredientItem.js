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
                borderTopWidth: 2,
                justifyContent: 'space-between'

            }
        } else {
            return {
                padding: 10,
                flexDirection: 'row',
                borderTopWidth: 1,
                justifyContent: 'space-between',
                opacity: 0.3
            }
        }
    }

    onPressItem () {
        this.context.onPressIngredient(this.props);
    }

    render () {
        if (this.props.isOwned) {
            return (
                <View style={this.getIgdContainerStyle(this.props.highlight)}>
                    <Text style={styles.igdItemText} >{this.props.name}</Text>
                    <TouchableHighlight onPress={this.onPressItem.bind(this)} >
                        <Image source={require('../../assets/ic_check_box_black_24dp.png')}/>
                    </TouchableHighlight>
                </View>
            
            )
        }else {
            return (
                <View style={this.getIgdContainerStyle(this.props.highlight)}>
                    <Text style={styles.igdItemText} >{this.props.name}</Text>
                    <TouchableHighlight onPress={this.onPressItem.bind(this)} >
                        <Image source={require('../../assets/ic_check_box_outline_blank_black_24dp.png')}/>
                    </TouchableHighlight>
                </View>
                
            )
        }
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