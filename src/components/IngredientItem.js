import React from 'react-native'

let {
    View,
    StyleSheet,
    Text,
    Switch
} = React

class IngredientItem extends React.Component{
    props: {
        name: 'test igd',
        id: 99999999
    };
    
    constructor (props) {
        super(props)
    }
    
    render () {
        var me = this;
        return (
            <View style={styles.container}>
                <Text>{this.props.name}</Text>
                <Switch
                    onValueChange={(value) => console.log(me.props.name)}
                    style={{marginBottom: 1}}
                    value={false}/>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    }
});

export default IngredientItem