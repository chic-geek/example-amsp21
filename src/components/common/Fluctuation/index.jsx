import React from "react";
import PropTypes from 'prop-types';

export default function Fluctuation({ value }) {
  const commonClasses = 'py-0.5 px-1 rounded text-xs font-bold';

  if (value === 0) return <React.Fragment>{'-'}</React.Fragment>;

  if (Math.sign(value) !== -1) {
    return (
      <span className={`${commonClasses} bg-green-400 text-green-900`}>
        {'+'}{value}
      </span>
    );
  } else {
    return (
      <span className={`${commonClasses} bg-red-400 text-red-900`}>
        {value}
      </span>
    );
  }
}

Fluctuation.propTypes = {
  value: PropTypes.number.isRequired,
};
