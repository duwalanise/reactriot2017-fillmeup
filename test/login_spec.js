import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import Login from '../src/components/login.jsx';

describe('<Login />', () => {
  context('Initial state', () => {
    const wrapper = shallow(<Login />);
    it('should have specific states', () => {
      expect(wrapper.state().email).to.be.defined;
      expect(wrapper.state().password).to.be.defined;
      expect(wrapper.state().signIn).to.be.defined;
      expect(wrapper.state().hasError).to.be.defined;
      expect(wrapper.state().hasForgotten).to.be.defined;
      expect(wrapper.state().resetSuccess).to.be.defined;
    });
  });
});
