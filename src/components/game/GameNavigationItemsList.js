import React, {Component} from 'react';
import GameNavigationItem from './GameNavigationItem'
import PropTypes from 'prop-types';

class GameNavigationItemsList extends Component {
    render() {
        return (
            <div className='game-navigation__list'>
                {this.getItems()}
            </div>
        );
    }

    getItems() {
        return this.props.navigationItems.map(this.getItem)
    }

    getItem = (navigationItem) => {
        return <GameNavigationItem
            key={navigationItem.id}
            navigationItem={navigationItem}
        />
    }
}

GameNavigationItemsList.propTypes = {};
GameNavigationItemsList.defaultProps = {};

export default GameNavigationItemsList;
