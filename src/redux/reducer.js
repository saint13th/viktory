import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'
import gameReducer, {moduleName as gameModule} from '../ducks/game'

export default combineReducers({
    router, form,
    [gameModule]: gameReducer,
})