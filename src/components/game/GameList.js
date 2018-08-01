import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Game from '../game/Game'
import {gameListSelector, moduleName} from "../../ducks/game";
import {connect} from "react-redux";

class GameList extends Component {
    render() {
        return (
            <div className='game__list'>
                {this.getItems()}
            </div>
        );
    }

    getItems() {
        return this.props.navigationItems.map(this.getItem)
    }

    getItem = (navigationItem) => {
        return <Game
            key={navigationItem.id}
            openedId={this.props.games[0]}
        />
    }
}

GameList.propTypes = {};
GameList.defaultProps = {};

export default connect(state => ({
    games: gameListSelector(state)
}), null)(GameList)
