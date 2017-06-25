import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import proxyquire from 'proxyquire';

describe('<App />', () => {
  const signOut = sinon.spy();
  const onAuthStateChanged = sinon.spy();
  const on = sinon.spy();
  const mockFirebase = {
    auth: () => ({
      signOut,
      onAuthStateChanged,
    }),
    database: () => ({
      ref: () => ({
        child: () => ({
          on,
        }),
      }),
    }),
  };
  const App = proxyquire('../src/components/app.jsx', {
    firebase: mockFirebase,
  }).App;

  context('Initial state', () => {
    const componentDidMount = sinon.stub(App.prototype, 'componentDidMount');
    const wrapper = shallow(<App
      dispatch={sinon.spy()}
      userDetail={{ name: 'test' }}
      signOut={sinon.spy()}
    />);
    it('should have a specific class, children-wrap', () => {
      expect(wrapper.find('.children-wrap')).to.have.length(1);
    });
    componentDidMount.restore();
  });

  context('Function signOut', () => {
    const componentDidMount = sinon.stub(App.prototype, 'componentDidMount');
    const wrapper = shallow(<App
      dispatch={sinon.spy()}
      userDetail={{ name: 'test' }}
      signOut={sinon.spy()}
    />);
    it('should call firebase auth signOut', () => {
      App.signOut();
      expect(signOut.callCount).to.equal(1);
    });
    componentDidMount.restore();
  });

  context('Lifecycle componentDidMount', () => {
    const wrapper = shallow(<App
      dispatch={sinon.spy()}
      userDetail={{ name: 'test' }}
      signOut={sinon.spy()}
    />);
    it('should call onAuthStateChanged and child', () => {
      wrapper.instance().componentDidMount();
      expect(onAuthStateChanged.callCount).to.equal(1);
      expect(on.callCount).to.equal(1);
    });
  });
});
