import React from 'react'
import ReactNative from 'react-native'
import {connect} from 'react-redux'
//import Collapsible from 'react-native-collapsible';

//import IngredientItem from './IngredientItem';
import {updateUserIngredientsViewList, updateIngredientOwnership} from '../actions/ingredient' 
//import  from '../actions/ingredient'

let {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    Image,
    Switch
} = ReactNative

class IngredientEntity extends React.Component{
    props: {
        name: 'test_name',
        items: [],
        parentPath: '',
        leaf: undefined
    };
    
    constructor (props) {
        super(props)
        
        //this.state = {collapsed: true};
        if (this.props.leaf) {
            this.state = {checked: false}
        }
        this._toggleExpanded = this._toggleExpanded.bind(this);
        this.generateEntity = this.generateEntity.bind(this);
        this.toggleIngredient = this.toggleIngredient.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }
    
    _toggleExpanded() {
        //this.setState({ collapsed: !this.state.collapsed });
        var newPath = this.props.parentPath + '/' + this.props.name,
            newListData = this.props.items;
        this.props.dispatch(updateUserIngredientsViewList(newPath, newListData));
    }
    
    changeValue () {
        console.log('changeValue called');
        var ingredient = {};
        ingredient[this.props.id] = !this.state.checked;
        this.props.dispatch(updateIngredientOwnership(ingredient));
        this.setState({checked: !this.state.checked});
    }
    
    toggleIngredient() {
        console.log('toggleIngredient called');
        this.changeValue();
    }
    
    generateEntity () {
        if (!this.props.items && this.props.leaf) {
            return (
                <TouchableHighlight onPress={this.toggleIngredient} >
                    <View style={styles.container}>
                        <Text style={styles.ingredientText} >{this.props.name}</Text>
                        <Switch
                            onValueChange={this.changeValue}
                            style={{marginBottom: 1}}
                            value={this.state.checked}/>
                    </View>
                </TouchableHighlight>
            )
        } else {
            return (
                <TouchableHighlight onPress={this._toggleExpanded} >
                    <View style={styles.container} >
                        <Text style={styles.ingredientText} >{this.props.name}</Text>
                        <Image source={require('../../assets/ic_keyboard_arrow_right_black_24dp.png')}/>
                    </View>
                </TouchableHighlight>
            )
        }    
        
    }
    
    render () {
        return (
            <View>
                {this.generateEntity()}
                
            </View>
        )    
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ingredientText: {
        textAlign: 'left',
        fontSize: 16,
        fontWeight: '500',
    },
    groupContainer: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        backgroundColor: '#fff',
    }
});

export default connect()(IngredientEntity)