import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './configure-store'

import App from './App/App'

const store = configureStore()

class RecipeSearchFE_RN extends React.Component {
	render () {
		return (
            <Provider store={store} >
			    <App/>
            </Provider>
		)
	}
}

export default RecipeSearchFE_RN