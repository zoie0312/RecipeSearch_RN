import React from 'react-native'

import RecipeItem from '../components/RecipeItem'
import GiftedList from '../components/GiftedList'

var MOCKED_RECIPE_DATA = [
  {
  	title: '宮保雞丁',
  	ingredient_list: ['雞胸肉', '醬油膏', '蒜頭', '乾辣椒', '蔥'],
  	image: 'https://dbjdsnch130xu.cloudfront.net/uploads/recipe/cover/129209/large_fd890f1d7f58519d.jpg'
  }
];

class App extends React.Component {
	render () {
		return (
			//<RecipeItem
            //    {...MOCKED_RECIPE_DATA[0]}/>
            <GiftedList/>
		)
	}
}

export default App