import React from 'react'
import ReactNative from 'react-native'
let {
    View,
    StyleSheet,
    Text
} = ReactNative

class Recipe extends React.Component{
    constructor (props) {
        super(props)
    }
    
    render () {
        return (
            <View style={styles.container}>
                <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>
                    This is the detailed recipe view!
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

export default Recipe