import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PumpModalBox extends Component {
  constructor(props) {
    super(props);
    const pumpDetail = this.props.pumpDetail;
    this.state = {
      pumpId: pumpDetail.pumpId,
      uid: pumpDetail.uid,
      name: pumpDetail.name,
      address: pumpDetail.address,
      status: pumpDetail.status,
      contact: pumpDetail.contact,
      consumptionToday: pumpDetail.consumptionToday,
      distriputionToday: pumpDetail.distriputionToday,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    // this.state.pumpId = this.generateId();
    // evt.preventDefault();
    // const dbref = firebase.database().ref();
    // dbref.child('pumps').push(this.state);
  }

  render() {
    const {
      name,
      address,
      status,
      contact,
      consumptionToday,
      distriputionToday,
    } = this.state;
    const pumpId = this.props.pumpDetail.pumpId;
    return (
      <div className="modal fade" id={pumpId.slice(1, 6)} role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={this.handleSubmit}>
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Edit Detail</h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="pump-name" className="control-label">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pump-name"
                    name="name"
                    value={name}
                    required
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pump-address" className="control-label">Address:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pump-address"
                    name="address"
                    value={address}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pump-contact" className="control-label">Contact:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pump-contact"
                    name="contact"
                    value={contact}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pump-Consumption" className="control-label">Consumption:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pump-consumption"
                    name="consumptionToday"
                    value={consumptionToday}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pump-distribution" className="control-label">Distribution:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pump-distribution"
                    name="distriputionToday"
                    value={distriputionToday}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pump-distribution" className="control-label">Status:</label>
                  <select
                    className="form-control"
                    id="pump-status"
                    name="status"
                    value={status}
                    onChange={this.handleChange}
                  >
                    <option value="open">Open</option>
                    <option value="close">Close</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PumpModalBox;

PumpModalBox.propTypes = {
  pumpDetail: PropTypes.object,
};
