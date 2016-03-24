import React from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './configure-store'

import App from './containers/App'

const store = configureStore()
// TODO: using provider from react-redux
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