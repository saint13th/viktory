import {createSelector} from 'reselect'
import {appName} from '../config'
import {Record, OrderedMap, OrderedSet} from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'game'
const prefix = `${appName}/${moduleName}`

export const SELECT_GAME = `${prefix}/SELECT_GAME`
export const SELECT_GAME_ITEM = `${prefix}/SELECT_GAME_ITEM`
export const CLOSE_GAMES = `${prefix}/CLOSE_GAMES`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    entities: new OrderedMap({}),
    opened: new OrderedSet([]),
    selected: new OrderedSet([]),
})

export const GameRecord = Record({
    id: null,
    title: null,
});

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {

        case CLOSE_GAMES:
            return state
                .update('opened', opened => opened.clear())

        case SELECT_GAME:
            return state
                .update('opened', opened => opened.clear().add(payload.id))

        case SELECT_GAME_ITEM:
            return state.selected.contains(payload.id)
                ? state.update('selected', selected => selected.remove(payload.id))
                : state.update('selected', selected => selected.add(payload.id))

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const gameSelector = createSelector(stateSelector, state => state.opened)
export const gameListSelector = createSelector(gameSelector, games => (
    games.valueSeq().toArray()
))
export const sectionSelector = createSelector(stateSelector, state => state.selected)
export const selectedGamesSelector = createSelector(gameSelector, sectionSelector, (games, selection) => (
    selection.toArray().map(id => games.get(id))
))

/**
 * Action Creators
 * */

export function selectGame(id) {
    return {
        type: SELECT_GAME,
        payload: {id}
    }
}
export function closeGame(id) {
    return {
        type: CLOSE_GAMES
    }
}