import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default function FieldOfPlayComponent(props) {
  const cellClassList = classNames('item', {
    [`item--${props.modeA}`]: props.modeA,
    'active': props.cell.active,
    'PCWin': props.cell.PCWin,
    'userWin': props.cell.userWin,
  });

  return (
    <div
      onClick={() => props.userWin(props.index)}
      className={cellClassList}
    />
  );
}

FieldOfPlayComponent.propTypes = {
  cell: PropTypes.shape({
    active: PropTypes.bool,
    PCWin: PropTypes.bool,
    userWin: PropTypes.bool,
  }).isRequired,
  userWin: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  modeA: PropTypes.string.isRequired,
};
