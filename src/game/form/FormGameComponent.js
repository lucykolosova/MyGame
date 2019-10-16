import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function FormGameComponent(props) {
  const selectClassList = classNames('form__select-item', {
    'form__select-item--open': props.openDropDown && !props.inProgress,
  });
  const dropDownClassList = classNames('dropdown', {
    'dropdown--open': props.openDropDown && !props.inProgress,
  });
  const disabledButton = !(props.player && props.mode) || props.inProgress;
  const user = {
    user: localStorage.getItem('user'),
    mode: localStorage.getItem('mode'),
  };
  const playAgain = user.user === props.player && (
    user.mode === props.mode);

  return (
    <form className="form" onSubmit={e => e.preventDefault()}>
      <ul className="form__select">
        <li className={selectClassList} onClick={props.openDD}>{props.mode || 'Pick game mode'}</li>
        <li className={dropDownClassList}>
          <ul onClick={e => props.changeMode(e)} className="dropdown__menu">
            <li>
              <input
                className="dropdown__item"
                type="button"
                value="easy"
              />
            </li>
            <li>
              <input
                className="dropdown__item"
                type="button"
                value="normal"
              />
            </li>
            <li>
              <input
                className="dropdown__item"
                type="button"
                value="hard"
              />
            </li>
          </ul>
        </li>
      </ul>
      <input
        className="form__input"
        type="text"
        placeholder="Enter your name"
        disabled={props.inProgress}
        onChange={e => props.setUserName(e)}
      />
      <button type="button" disabled={disabledButton} onClick={props.startGame} className="form__button">
        {
          playAgain
            ? 'Play again'
            : 'Play'
        }
      </button>
    </form>
  );
}

FormGameComponent.propTypes = {
  openDropDown: PropTypes.bool.isRequired,
  inProgress: PropTypes.bool.isRequired,
  player: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  openDD: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  setUserName: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};
