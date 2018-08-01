import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {moduleName, selectGame, gameListSelector} from '../../ducks/game'
import './css/game-navigation.css'

class GameNavigationItem extends Component {
    render() {
        const openedId = this.props.games[0]
        const navId = this.props.navigationItem.id
        const itemClass = (openedId === navId) ? 'game-navigation__item game-navigation__item_active' : 'game-navigation__item';

        return (
            <div className={itemClass} onClick={this.handleClick(this.props.navigationItem.id)}>
                {this.props.navigationItem.word}
            </div>
        );
    }

    handleClick = (id) => () => {
        const {selectGame} = this.props
        selectGame && selectGame(id)
    }
}

GameNavigationItem.propTypes = {};
GameNavigationItem.defaultProps = {};

// export default GameNavigationItem;

export default connect(state => ({
    games: gameListSelector(state),
    loading: state[moduleName].loading
}), {selectGame})(GameNavigationItem)

