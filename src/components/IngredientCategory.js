import React from 'react-native'

let {
    View,
    StyleSheet,
    Text,
    TouchableHighlight
} = React

import Collapsible from 'react-native-collapsible';

import IngredientItem from './IngredientItem';

class IngredientCategory extends React.Component{
    props: {
        name: 'test_name',
        items: []
    };
    
    constructor (props) {
        super(props)
        
        this.state = {collapsed: true};
        this._generateContent = this._generateContent.bind(this);
        this._toggleExpanded = this._toggleExpanded.bind(this);
    }
    
    _toggleExpanded() {
        this.setState({ collapsed: !this.state.collapsed });
    }
    
    _generateContent() {
        var content,
            groupedItems = [];
        var length = this.props.items.length;
        //var start = performance.now();
        content = this.props.items.map(function(item, idx, array) {
            if ((idx % 3) === 0) {
                if (idx === (length-1)) {
                    return (
                        <View style={styles.groupContainer}>
                            <IngredientItem name={item.text} id={item.id}/>
                        </View>
                    )
                } else if ((idx+1) === (length-1)) {
                    return (
                        <View style={styles.groupContainer}>
                            <IngredientItem name={item.text} id={item.id}/>
                            <IngredientItem name={array[idx+1].text} id={array[idx+1].id}/>
                        </View>
                    )
                } else {
                    return (
                        <View style={styles.groupContainer}>
                            <IngredientItem name={item.text} id={item.id}/>
                            <IngredientItem name={array[idx+1].text} id={array[idx+1].id}/>
                            <IngredientItem name={array[idx+2].text} id={array[idx+2].id}/>
                        </View>
                    )
                }
            } 
        });
        // return (
        //     <View style={{flex: 1}}>
        //         <Text>Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha bee</Text>
        //     </View>
        // )
        //var end = performance.now()
        //console.log('ingredient category ' + this.props.name +' content generation time: ' +  (end-start) + ' miliseconds.')
        return content;
    }
    
    render () {
        return (
            <View>
                <TouchableHighlight onPress={this._toggleExpanded}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{this.props.name}</Text>
                    </View>
                </TouchableHighlight>
                <Collapsible collapsed={this.state.collapsed} align="center">
                    {this._generateContent()}
                </Collapsible>
            </View>
        )    
    }
}

var styles = StyleSheet.create({
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    headerText: {
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

export default IngredientCategory