import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
import '../../reset.css';

export default function WinnersTable(props) {
  return (
    <div className="table">
      <div className="table__row">
        <div className="table__cell">Winner</div>
        <div className="table__cell">Date</div>
      </div>
      {
        props.winners.map(winner => (
          <div className="table__row" key={8 * Math.random()}>
            <div className="table__cell">
              {winner.winner}
            </div>
            <div className="table__cell">
              {winner.date}
            </div>
          </div>
        ))
      }
    </div>
  );
}

WinnersTable.propTypes = {
  winners: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    winner: PropTypes.string,
  })).isRequired,
};
