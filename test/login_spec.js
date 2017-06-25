import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import proxyquire from 'proxyquire';

describe('<Login />', () => {
  const mockFirebase = {
    auth: () => ({
      signInWithEmailAndPassword: (email) => {
        if (email === 'success') {
          return Promise.resolve();
        }
        return Promise.reject();
      },
      signInWithPopup: (service) => {
        if (service) {
          return Promise.resolve();
        }
        return Promise.reject();
      },
      sendPasswordResetEmail: (email) => {
        if (email === 'success') {
          return Promise.resolve();
        }
        return Promise.reject();
      },
    }),
  };
  mockFirebase.auth.FacebookAuthProvider = () => 'Facebook';
  const Login = proxyquire('../src/components/login.jsx', {
    firebase: mockFirebase,
  }).default;

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
    it('should have specific classes', () => {
      expect(wrapper.find('.login-modal').length).to.equal(1);
      expect(wrapper.find('.login-info').length).to.equal(1);
      expect(wrapper.find('.social-login-options').length).to.equal(1);
      expect(wrapper.find('.facebook-login').length).to.equal(1);
      expect(wrapper.find('.google-login').length).to.equal(1);
      expect(wrapper.find('.twitter-login').length).to.equal(1);
      expect(wrapper.find('.github-login').length).to.equal(1);
    });
  });

  context('hasForgotten view', () => {
    const wrapper = shallow(<Login />);
    wrapper.setState({ hasForgotten: true });
    it('should have specific classes', () => {
      expect(wrapper.find('.login-modal').length).to.equal(1);
      expect(wrapper.find('.forgotten-password').length).to.equal(2);
    });
  });

  context('Function handleChange', () => {
    const wrapper = shallow(<Login />);
    it('should update specified state', () => {
      wrapper.instance().handleChange({ target: { name: 'email', value: 'test@test.com' } });
      expect(wrapper.state().email).to.equal('test@test.com');
    });
  });

  context('Function handleSubmit', () => {
    const wrapper = shallow(<Login />);
    it('should not update hasError on success', () => {
      wrapper.setState({ email: 'success' });
      wrapper.instance().handleSubmit({ preventDefault: () => true });
      expect(wrapper.state().hasError).to.equal(false);
    });
    it('should update hasError on success', () => {
      wrapper.setState({ email: 'success' });
      wrapper.instance().handleSubmit({ preventDefault: () => true });
      expect(wrapper.state().hasError).to.equal(true);
    });
  });

  context('Function getProvider', () => {
    const wrapper = shallow(<Login />);
    it('should return Facebook provider when service is Facebook', () => {
      expect(wrapper.instance().getProvider('Facebook')).to.eql(new mockFirebase.auth.FacebookAuthProvider());
    });
    it('should return null when no there is no input service', () => {
      expect(wrapper.instance().getProvider()).to.eql(null);
    });
  });

  context('Function handleSignIn', () => {
    const wrapper = shallow(<Login />);
    it('should not update hasError on success', () => {
      wrapper.instance().handleSignIn('Facebook');
      expect(wrapper.state().hasError).to.equal(false);
    });
    it('should update hasError on success', () => {
      wrapper.instance().handleSignIn();
      expect(wrapper.state().hasError).to.equal(true);
    });
  });

  context('Function handleForgetPassword', () => {
    const wrapper = shallow(<Login />);
    it('should update hasForgotten and hasError states', () => {
      wrapper.instance().handleForgetPassword();
      expect(wrapper.state().hasForgotten).to.equal(true);
      expect(wrapper.state().hasError).to.equal(false);
    });
  });

  context('Function handleBackClick', () => {
    const wrapper = shallow(<Login />);
    it('should update hasForgotten and hasError states', () => {
      wrapper.instance().handleBackClick();
      expect(wrapper.state().hasForgotten).to.equal(false);
      expect(wrapper.state().hasError).to.equal(false);
    });
  });

  context('Function handlePasswordResetClick', () => {
    it('should update resetSuccess and hasError on success', () => {
      const wrapper = shallow(<Login />);
      wrapper.setState({ email: 'success' });
      return wrapper.instance().handlePasswordResetClick().then(() => {
        expect(wrapper.state().resetSuccess).to.equal(true);
        expect(wrapper.state().hasError).to.equal(true);
      });
    });
    it('should update resetSuccess and hasError on error', () => {
      const wrapper = shallow(<Login />);
      wrapper.setState({ email: '' });
      return wrapper.instance().handlePasswordResetClick().then(() => {
        expect(wrapper.state().resetSuccess).to.equal(false);
        expect(wrapper.state().hasError).to.equal(true);
      });
    });
  });

  context('Function displayLoginMsg', () => {
    it('should return an element when hasError is true', () => {
      const wrapper = shallow(<Login />);
      wrapper.setState({ hasError: true });
      expect(wrapper.instance().displayLoginMsg().props.className).to.equal('alert alert-warning');
    });
    it('should return null when hasError is false', () => {
      const wrapper = shallow(<Login />);
      wrapper.setState({ hasError: false });
      expect(wrapper.instance().displayLoginMsg()).to.equal(null);
    });
  });

  context('Function displayForgetMsg', () => {
    it('should return an element when hasError is true', () => {
      const wrapper = shallow(<Login />);
      wrapper.setState({ hasError: true });
      expect(wrapper.instance().displayForgetMsg().props.className).to.equal('alert alert-warning');
    });
    it('should return null when hasError is false', () => {
      const wrapper = shallow(<Login />);
      wrapper.setState({ hasError: false });
      expect(wrapper.instance().displayForgetMsg()).to.equal(null);
    });
  });
});
