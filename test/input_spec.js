import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Input from '../src/components/input.jsx';

describe('<Input />', () => {
  const onChange = sinon.spy();
  const wrapper = shallow(<Input
    type="type"
    name="name"
    placeholder="placeholder"
    value="value"
    className="className"
    required
    onChange={onChange}
  />);
  context('Initial state', () => {
    it('should have specific classes', () => {
      expect(wrapper.find('.row')).to.have.length(1);
      expect(wrapper.find('.col-xs-12')).to.have.length(1);
      expect(wrapper.find('.form-group')).to.have.length(1);
    });
    it('should have specific props', () => {
      expect(wrapper.props.type).to.be.defined;
      expect(wrapper.props.name).to.be.defined;
      expect(wrapper.props.placeholder).to.be.defined;
      expect(wrapper.props.value).to.be.defined;
      expect(wrapper.props.className).to.be.defined;
      expect(wrapper.props.required).to.be.defined;
      expect(wrapper.props.onChange).to.be.defined;
    });
  });
});
