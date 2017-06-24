import React from 'react';

const Input = props =>
  <div className="row">
    <div className="col-xs-12">
      <div className="form-group">
        <input
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          className="form-control"
          required={props.isRequired}
          onChange={props.handleChange}
        />
      </div>
    </div>
  </div>;

export default Input;
