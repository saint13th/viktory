import React, {Component} from 'react';
import GameNavigationItemsList from '../game/GameNavigationItemsList'
import {navigationItems} from '../../fixtures'
import GameList from "../game/GameList";
import Game from '../game/Game'
import {gameListSelector, moduleName} from "../../ducks/game";
import {connect} from "react-redux";

class GamePage extends Component {
    render() {
        return (
            <div>
                <GameNavigationItemsList navigationItems={navigationItems}/>
                {/*<GameList navigationItems={navigationItems} openedId={this.props.games[0]}/>*/}
                <Game navigationItems={navigationItems} openedId={this.props.games[0]}/>
            </div>
        );
    }
}

GamePage.propTypes = {};
GamePage.defaultProps = {};

// export default GamePage

export default connect(state => ({
    games: gameListSelector(state),
}), null)(GamePage)