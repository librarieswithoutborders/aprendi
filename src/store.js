import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers';
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const loggerMiddleware = createLogger()

console.log(process.env)

const store = createStore(
	rootReducer,
	applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
	)
)

export default store;
