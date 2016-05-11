import React from 'react-native'

let {
    View,
    StyleSheet,
    Text
} = React

class ShoppingList extends React.Component{
    constructor (props) {
        super(props)
    }
    
    render () {
        return (
            <View style={styles.container}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>
                    This is the shopping list view!
                </Text>
            </View>
                
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    }
});

export default ShoppingList