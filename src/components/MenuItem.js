import React from 'react-native'

let {
    View,
    StyleSheet,
    Text,
    TouchableNativeFeedback
} = React

class MenuItem extends React.Component {
    propTypes: {
        title: React.PropTypes.string,
        onPress: React.PropTypes.func
    };
    
    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.props.onPress}>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        //width: 150,
        height: 100,
        backgroundColor: 'yellow',
        borderWidth: 2,
        justifyContent: 'center'
    },
    title: {
        margin: 10, 
        fontSize: 15, 
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});

module.exports = MenuItem;