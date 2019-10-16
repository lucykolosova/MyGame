import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addNewPlayer, setActiveMode, gameInProgress } from '../action';
import { startGameCycle, startGame } from '../creator';
import FormGameComponent from './FormGameComponent';

import './styles.scss';
import '../../reset.css';

class FormGameContainer extends React.Component {
  state = {
    openDropDown: false,
    player: '',
  };

  componentDidMount() {
    localStorage.clear();
  }

  openDD = () => {
    this.setState(prevState => ({ openDropDown: !prevState.openDropDown }));
  };

  changeMode = (e) => {
    this.props.setActiveMode(e.target.value);
    this.setState(prevState => ({ openDropDown: !prevState.openDropDown }));
  };

  setUserName = (e) => {
    this.setState({ player: e.target.value });
  };

  startGame = () => {
    localStorage.setItem('user', `${this.state.player}`);
    localStorage.setItem('mode', `${this.props.mode}`);
    this.props.addNewPlayer({ user: this.state.player, mode: this.props.mode });
    this.props.startGame();
    this.props.gameInProgress(true);
  };

  render() {
    return (
      <>
        <FormGameComponent
          inProgress={this.props.inProgress}
          openDD={this.openDD}
          openDropDown={this.state.openDropDown}
          player={this.state.player}
          mode={this.props.mode}
          changeMode={this.changeMode}
          setUserName={this.setUserName}
          startGame={this.startGame}
        />
      </>
    );
  }
}

const mapDispatchToProps = {
  addNewPlayer,
  setActiveMode,
  startGameCycle,
  startGame,
  gameInProgress,
};
const mapStateToProps = state => ({
  mode: state.game.activeMode,
  inProgress: state.game.inProgress,
});

FormGameContainer.propTypes = {
  inProgress: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  addNewPlayer: PropTypes.func.isRequired,
  setActiveMode: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  gameInProgress: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormGameContainer);
