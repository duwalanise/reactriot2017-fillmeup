import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { NavDropdown } from '../src/components/nav_dropdown.jsx';

describe('<NavDropdown />', () => {
  context('Initial state', () => {
  const wrapper = shallow(<NavDropdown
    userDetail={{}}
    signOut={null}
  />);
    it('should have specific props', () => {
      expect(wrapper.props.userDetail).to.be.defined;
      expect(wrapper.props.signOut).to.be.defined;
    });
  });

  context('Conditional component render', () => {
    it('should have specific classes when userDetail is defined', () => {
      const wrapper = shallow(<NavDropdown
        userDetail={{}}
        signOut={null}
      />);
      expect(wrapper.find('.dropdown')).to.have.length(1);
      expect(wrapper.find('.dropdown-menu')).to.have.length(1);
      expect(wrapper.find('.user-info')).to.have.length(1);
    });
    it('should have specific classes when userDetail is undefined', () => {
      const wrapper = shallow(<NavDropdown
        signOut={null}
      />);
      expect(wrapper.find('.dropdown')).to.have.length(0);
      expect(wrapper.find('.dropdown-menu')).to.have.length(0);
      expect(wrapper.find('.user-info')).to.have.length(1);
    });
  });
});
