import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getGameModeThunk, getGameWinnersThunk, userWin } from '../creator';
import FieldOfPlayComponent from './FieldOfPlayComponent';
import WinnersTable from '../winnersTable/WinnersTable';

import './styles.scss';
import '../../reset.css';

class FieldOFPlayContainer extends React.Component {
  componentDidMount() {
    this.props.getGameModeThunk();
    this.props.getGameWinnersThunk();
  }

  render() {
    return (
      <>
        {
          this.props.userName && (
            <p className="gameCounter">
              <span>{this.props.userName}:{this.props.counter.user}</span>-
              <span>PC:{this.props.counter.PC}</span>
            </p>
          )
        }
        { this.props.initArray.length
          ? (
            <div className={`gameContainer gameContainer--${this.props.modeA}`}>
              {
            this.props.initArray.map((item, index) => (
              <FieldOfPlayComponent
                key={6 * Math.random()}
                modeA={this.props.modeA}
                userWin={this.props.userWin}
                cell={item}
                index={index}
              />
            ))
          }
            </div>
          )
          : (<WinnersTable winners={this.props.winners} />)
        }
      </>
    );
  }
}

const mapStateToProps = state => ({
  modeA: state.game.activeMode,
  initArray: state.game.initArray,
  randomNumber: state.game.randomNumber,
  counter: state.game.counter,
  userName: state.game.activeUser,
  winners: state.game.winners,
});

const mapDispatchToProps = {
  getGameModeThunk,
  getGameWinnersThunk,
  userWin,
};

FieldOFPlayContainer.propTypes = {
  modeA: PropTypes.string.isRequired,
  initArray: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool,
    PCWin: PropTypes.bool,
    userWin: PropTypes.bool,
  })).isRequired,
  counter: PropTypes.shape({
    user: PropTypes.number,
    PC: PropTypes.number,
  }).isRequired,
  userName: PropTypes.string.isRequired,
  getGameModeThunk: PropTypes.func.isRequired,
  getGameWinnersThunk: PropTypes.func.isRequired,
  userWin: PropTypes.func.isRequired,
  winners: PropTypes.arrayOf(PropTypes.shape({
    winner: PropTypes.string,
    date: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldOFPlayContainer);
