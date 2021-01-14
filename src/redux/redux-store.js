import loginReducer from "./login-reducer";
import createSagaMiddleware from 'redux-saga'
import { watchLoadData } from './sagas'

const { createStore, combineReducers, applyMiddleware } = require("redux");

const sagaMiddleware = createSagaMiddleware()

// const reducers = combineReducers({
//   signin: signinReducer,
//   loggedPerson: loginReducer,
//   contactsList: contactsReducer
// })

const store = createStore(loginReducer, applyMiddleware( sagaMiddleware ) )
sagaMiddleware.run(watchLoadData)

export default store
