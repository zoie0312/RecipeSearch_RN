import React from 'react-native'

let {
    Navigator
    
} = React

import RecipeItem from '../components/RecipeItem'
import GiftedList from '../components/GiftedList'
import MainContainer from './MainContainer'

var MOCKED_RECIPE_DATA = [
  {
  	title: '宮保雞丁',
  	ingredient_list: ['雞胸肉', '醬油膏', '蒜頭', '乾辣椒', '蔥'],
  	image: 'https://dbjdsnch130xu.cloudfront.net/uploads/recipe/cover/129209/large_fd890f1d7f58519d.jpg'
  }
];

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    
    renderScene(route, navigator) {
        let Component = route.component
        
        return (
            <Component navigator={navigator} route={route} />
        )
    }
    
	render () {
		// return (
		// 	//<RecipeItem
        //     //    {...MOCKED_RECIPE_DATA[0]}/>
        //     <GiftedList/>
		// )
        
        return (
            <Navigator 
                renderScene={this.renderScene}
                initialRoute={{
                    component: MainContainer,
                    name: 'Main'
                }}
            />
        )
	}
}

export default App