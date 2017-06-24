import React, { PropTypes } from 'react';

const Switch = props =>
  <div className="switch">
    <label htmlFor="toggle-switch">
      <input
        id="toggle-switch"
        type="checkbox"
        checked={props.isChecked}
        onChange={evt => props.onChange(evt)}
      />
      <div className={`slider ${props.isRound ? 'round' : ''}`}>
        <span className="slider-label">{props.label}</span>
      </div>
    </label>
  </div>;

Switch.propTypes = {
  label: PropTypes.string,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
  isRound: PropTypes.bool,
};

Switch.defaultProps = {
  onChange: () => false,
};

export default Switch;
