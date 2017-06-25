import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { SimpleMapPage } from '../src/components/map.jsx';

describe('<SimpleMapPage />', () => {
  const wrapper = shallow(<SimpleMapPage
    center={[]}
    zoom={5}
    pumpDetails={
    [{
      pumpId: '1',
      coordinates: {
        lat: '1',
        lng: '2',
      },
      pumpDetail: {},
      setPumpId: null,
    }]}
  />);
  context('Initial state', () => {
    it('should have specific props', () => {
      expect(wrapper.props.center).to.be.defined;
      expect(wrapper.props.zoom).to.be.defined;
      expect(wrapper.props.pumpDetails).to.be.defined;
    });
    it('should have state pumpId', () => {
      expect(wrapper.state().pumpId).to.be.defined;
    });
    it('should have specific children', () => {
      expect(wrapper.find('Marker')).to.have.length(1);
      expect(wrapper.find('GoogleMap')).to.have.length(1);
    });
  });
});
