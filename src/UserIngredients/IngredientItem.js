import React from 'react'
import ReactNative from 'react-native'
import {connect} from 'react-redux'

import updateIngredientOwnership from '../actions/ingredient'

let {
    View,
    StyleSheet,
    Text,
    Switch
} = ReactNative

class IngredientItem extends React.Component{
    props: {
        name: 'test igd',
        id: 99999999
    };
    
    constructor (props) {
        super(props)
        
        this.state = {checked: false};
        this.changeValue = this.changeValue.bind(this);
    }
    
    changeValue() {
        var ingredient = {};
        ingredient[this.props.id] = !this.state.checked;
        this.props.dispatch(updateIngredientOwnership(ingredient));
        this.setState({checked: !this.state.checked});
    }
    
    render () {
        var me = this;
        return (
            <View style={styles.container}>
                <Text>{this.props.name}</Text>
                <Switch
                    onValueChange={this.changeValue}
                    style={{marginBottom: 1}}
                    value={this.state.checked}/>
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

export default connect()(IngredientItem)