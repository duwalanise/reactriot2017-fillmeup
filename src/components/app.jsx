// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link, browserHistory } from 'react-router';

// class App extends Component {
//   render() {
//     return <div> hello </div>;
//   }
// }

import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class App extends Component {
  // static defaultProps = {
  //   center: {lat: 59.95, lng: 30.33},
  //   zoom: 11
  // };

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text={'Kreyser Avrora'}
        />
      </GoogleMapReact>
    );
  }
}

App.defaultProps = {
  center: {lat: 59.95, lng: 30.33},
  zoom: 11,
}

export default App;
