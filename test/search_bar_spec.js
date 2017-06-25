import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SearchBar from '../src/components/search_bar.jsx';

describe('<SearchBar />', () => {
  context('Initial state', () => {
    const wrapper = shallow(<SearchBar
      setCenter={null}
      center={1}
    />);
    it('should have specific props', () => {
      expect(wrapper.props.setCenter).to.be.defined;
      expect(wrapper.props.center).to.be.defined;
    });
    it('should have specific states', () => {
      expect(wrapper.state().center).to.be.defined;
      expect(wrapper.state().address).to.be.defined;
    });
    it('should have specific classes', () => {
      expect(wrapper.find('.search-modal').length).to.equal(1);
    });
  });

  context('handleAddressChange', () => {
    const wrapper = shallow(<SearchBar uid="1" />);
    it('should update address state', () => {
      wrapper.instance().handleAddressChange({ target: { value: 'Nepal' } });
      expect(wrapper.state().address).to.equal('Nepal');
    });
  });
});
