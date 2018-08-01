import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form'
import './css/game-card.css'

class GameCard extends Component {

    render() {
        return (
            <div className='game-card'>
                <div className='game-card__header'>
                    <div className="game-card__header-text">
                        Отметьте не менее 4 чисел в первой части поля
                    </div>
                </div>
                <div className='game-card__body'>
                    {this.getItems()}
                </div>
            </div>
        );
    }

    getItems() {
        return this.props.cardNumbers.map(this.getItem)
    }

    getItem = (cardNumber) => {
        const itemName = 'cardItem_' + cardNumber + '_' + this.props.position;
        return <div key={cardNumber.toString()} className='game-card__item'>
            <Field name={itemName}
                   id={itemName}
                   component="input"
                   className="game-card__item-input"
                   type="checkbox"
                   value={cardNumber}/>
            <label htmlFor={itemName} className="game-card__item-label">{cardNumber}</label>
        </div>
    }
}

GameCard.propTypes = {};
GameCard.defaultProps = {};

export default GameCard;
