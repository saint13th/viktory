import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {reduxForm, Field} from 'redux-form'
import GameCard from './GameCard'
import DropdownList from 'react-widgets/lib/DropdownList'
import {cardNumbers, editions, editionsCount, games} from '../../fixtures'
import {moduleName, closeGame, gameListSelector} from '../../ducks/game'
import 'react-widgets/dist/css/react-widgets.css'
import './css/game.css'
import '../button/css/button.css'
import '../icon/css/icon.css'
import '../common/css/modal.css'

const renderDropdownList = ({input, data, valueField, textField, defaultValue}) =>
    <DropdownList {...input}
                  data={data}
                  valueField={valueField}
                  textField={textField}
                  defaultValue={defaultValue}
                  onChange={input.onChange}/>;

/**
 * карточка игры
 */
class Game extends Component {
    static propTypes = {
        gameName: PropTypes.string,
        gamePrise: PropTypes.string,
        openedId: PropTypes.number  /* id открытой игры*/
    };

    componentWillMount() {
        this.GameForm = reduxForm({
            form: 'game' + this.props.openedId
        })(Game)
    }


    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;
        const propsId = this.props.openedId;
        const gameDescroption1 = 'Чтобы принять участие в лотерее, вы должны выбрать числа сразу в двух игровых полях';
        const gameDescroption2 = 'Минимальная лотерейная комбинация - это 4 числа в диапазоне от 1 до 20 в первом поле и 4числа от 1 до 20 во втором поле';
        const formId = 'game-form-' + propsId;
        let gameName;
        let gamePrise;
        let cardItems = 0;

        if (propsId === undefined) {
            return false;
        }

        games.map((game) => {
            if (game.id === propsId) {
                gameName = game.name;
                gamePrise = game.prise;
            }
        });

        return (
            <div className=''>

                <form onSubmit={this.props.onSubmit} id={formId}>
                    <div className='game'>
                        <div className='game__col game__col_1 game__info'>
                            <div className="game__info-row game__info-row_1">
                                <div className='game__logo'></div>
                                <div className='game__name'>
                                    {gameName}
                                </div>
                                <div className='game__button_rules button button_yellow'>
                                    Правила
                                </div>
                            </div>
                            <div className="game__info-row game__info-row_2">
                                <div className='game__prise'>
                                    Суперприз
                                    <div className='game__prise-text'>{gamePrise}</div>
                                    рублей
                                </div>
                            </div>
                            <div className="game__inf0-row game__info-row_3">
                                <div className='game__description'>
                                    {gameDescroption1}
                                </div>
                                <div className='game__description'>
                                    {gameDescroption2}
                                </div>
                            </div>
                        </div>

                        <div className='game__col game__col_2'>
                            <GameCard cardNumbers={cardNumbers} gameId={propsId} position='top'/>
                            <GameCard cardNumbers={cardNumbers} gameId={propsId} position='bottom'/>
                            <div className="game__card-actions">
                                <div className="button button_transparent game__button game__button_random"
                                     onClick={this.handleRandom}>
                                    Случайные числа
                                </div>
                                <button
                                    className="button button_transparent game__button game__button_clear"
                                    disabled={pristine || submitting}
                                    onClick={reset}>
                                    <div className="icon_close"></div>
                                    Очистить
                                </button>
                            </div>
                        </div>

                        <div className='game__col game__col_3 game__actions'>
                            <div className="game__actions-row game__actions-row_1">
                                <div className="button button_gray-grad game__button game__button_exit"
                                     onClick={this.handleClickClose}>
                                    <div className="icon_close"></div>
                                    Выход
                                </div>
                            </div>
                            <div className="game__actions-row game__actions-row_2">
                                <div className='game__edition'>
                                    <label className='game__actions-title'>Тираж</label>
                                    <Field className='game__actions-dropDown'
                                           name="editions"
                                           component={renderDropdownList}
                                           data={editions}
                                           valueField="value"
                                           textField="editions"
                                           defaultValue={'value'}/>
                                    <div className="game__actions-title">
                                        6 мая 10:30
                                    </div>
                                </div>
                                <div className='game__edition'>
                                    <label className='game__actions-title'>Кол-во тиражей</label>
                                    <Field className='game__actions-dropDown'
                                           name="editionsCount"
                                           component={renderDropdownList}
                                           data={editionsCount}
                                           valueField="value"
                                           textField="editions"/>
                                    <div className="game__actions-title">
                                        Стоимость ставки:
                                    </div>
                                    <div className="game__price">
                                        <div className="game__price-value">
                                            <div>3 000 000</div>
                                            <div>рублей</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="game__actions-row game__actions-row_3">
                                <div>
                                    <button
                                        disabled={pristine || submitting}
                                        className='button button_gray-grad game__button game__button_approve'
                                        type="submit">
                                        Подтвердить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }


    handleClickClose = () => {
        const {closeGame} = this.props
        closeGame && closeGame()
    };

    handleRandom = () => {
        const min = 1;
        const max = 20;
        const cards = document.querySelectorAll('.game-card');
        let i = 0;
        let arr = [];

        while (i < 4) {
            let rand = min + Math.random() * (max - min);
            rand = Math.floor(rand);
            if (rand in arr) continue;
            arr.push(rand);
            i++;
        }
    }

}

const validate = () => {
}

Game.defaultProps = {};

Game = reduxForm({
    form: 'game',
    validate
})(Game);

export default connect(state => ({
    games: gameListSelector(state),
}), {closeGame})(Game)
