import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './configure-store'

import App from './containers/App'

const store = configureStore()

class Application extends React.Component {
	render () {
		return (
            <Provider store={store} >
			    <App/>
            </Provider>
		)
	}
}

export default Application