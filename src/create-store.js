import {createStore, applyMiddleware} from 'redux';

export default function create-store(initialState) {
    const store = createStore(reducer, initialState)
    
    return store
}
