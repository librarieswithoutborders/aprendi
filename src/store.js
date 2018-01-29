import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers';
import { createLogger } from 'redux-logger'
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
const loggerMiddleware = createLogger()

const client = axios.create({ //all axios can be used, shown in axios documentation
  baseURL:'http://localhost:3333',
  responseType: 'json'
});

const store = createStore(
	rootReducer,
	applyMiddleware(
    axiosMiddleware(client), // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
	)
)

export default store;
