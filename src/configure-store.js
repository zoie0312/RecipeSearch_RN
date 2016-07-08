import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import devtools from 'remote-redux-devtools';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(thunk),
        devtools()
    );
    return createStore(rootReducer, initialState, enhancer);
    
    //const store = createStoreWithMiddleware(rootReducer, initialState);
    //return store
    
}
