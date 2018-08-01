import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {gameListSelector, moduleName, selectGame} from "../../ducks/game";
import {connect} from "react-redux";

class MainPage extends Component {
    render() {
        return (
            <div className='main'>
                <h2>Victory</h2>
                <div>
                    <Link to="/game">Перейти на страницу игры</Link>
                </div>
            </div>
        );
    }
}

MainPage.propTypes = {};
MainPage.defaultProps = {};


export default connect(state => ({
    games: gameListSelector(state)
}), null)(MainPage)
