import loginReducer from "./login-reducer";
import createSagaMiddleware from 'redux-saga'
import { watchLoadData } from './sagas'

const { createStore, applyMiddleware } = require("redux");

const sagaMiddleware = createSagaMiddleware()

const store = createStore(loginReducer, applyMiddleware( sagaMiddleware ) )
sagaMiddleware.run(watchLoadData)

export default store
