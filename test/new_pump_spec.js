import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import proxyquire from 'proxyquire';

describe('<NewPump />', () => {
  const mockFirebase = {
    database: () => ({
      ref: () => true,
    }),
  };
  const NewPump = proxyquire('../src/components/new_pump.jsx', {
    firebase: mockFirebase,
  }).NewPump;

  context('Initial state', () => {
    const wrapper = shallow(<NewPump uid="1" />);
    it('should have specific props', () => {
      expect(wrapper.props.uid).to.be.defined;
    });
    it('should have specific states', () => {
      expect(wrapper.state().pumpId).to.be.defined;
      expect(wrapper.state().uid).to.be.defined;
      expect(wrapper.state().name).to.be.defined;
      expect(wrapper.state().address).to.be.defined;
      expect(wrapper.state().status).to.be.defined;
      expect(wrapper.state().contact).to.be.defined;
      expect(wrapper.state().coordinates).to.be.defined;
      expect(wrapper.state().consumptionToday).to.be.defined;
      expect(wrapper.state().distriputionToday).to.be.defined;
      expect(wrapper.state().log).to.be.defined;
    });
    it('should have specific classes', () => {
      expect(wrapper.find('.login-modal')).to.have.length(1);
      expect(wrapper.find('.choose-location')).to.have.length(1);
    });
    it('should have specific children', () => {
      expect(wrapper.find('GoogleMap')).to.have.length(1);
      expect(wrapper.find('Input')).to.have.length(2);
    });
  });

  context('Function fillInAddress', () => {
    it('should update state when geometry is present', () => {
      const wrapper = shallow(<NewPump uid="1" />);
      wrapper.instance().fillInAddress({ getPlace: () => ({
        geometry: {
          location: {
            lat: () => 5,
            lng: () => 5,
          },
        },
        formatted_address: 'somewhere',
      }) });
      expect(wrapper.state().address).to.equal('somewhere');
      expect(wrapper.state().coordinates).to.eql({ lat: 5, lng: 5 });
    });
    it('should not update state when geometry is not present', () => {
      const wrapper = shallow(<NewPump uid="1" />);
      wrapper.instance().fillInAddress({ getPlace: () => ({
        formatted_address: 'somewhere',
      }) });
      expect(wrapper.state().address).to.equal('');
      expect(wrapper.state().coordinates).to.eql({ lat: 28, lng: 28 });
    });
  });

  context('Function generateId', () => {
    const wrapper = shallow(<NewPump uid="1" />);
    it('should randomly generate ids', () => {
      expect(wrapper.instance().generateId()).to.not.equal(wrapper.instance().generateId());
    });
  });

  context('mapClick', () => {
    const wrapper = shallow(<NewPump uid="1" />);
    it('should update coordinates state', () => {
      wrapper.instance().mapClick({ lat: 4, lng: 4 });
      expect(wrapper.state().coordinates).to.eql({ lat: 4, lng: 4 });
    });
  });

  context('handleChange', () => {
    const wrapper = shallow(<NewPump uid="1" />);
    it('should update specific state', () => {
      wrapper.instance().handleChange({ target: { name: 'uid', value: 5 } });
      expect(wrapper.state().uid).to.eql(5);
    });
  });

  context('handleAddressChange', () => {
    const wrapper = shallow(<NewPump uid="1" />);
    it('should update address state', () => {
      wrapper.instance().handleAddressChange({ target: { value: 'Nepal' } });
      expect(wrapper.state().address).to.equal('Nepal');
    });
  });
});
