const fillMeUpState = {
  googleMapSetting: {
    center: [27.6795718, 85.3171355],
    zoom: 12,
  },
  googleSessionInfo: {
    user: {},
    token: '',
  },
  profileDetail: [{
    pump_id: 'abcdefg',
    user_id: '1234567',
    name: 'Rajat Petrol Service',
    address: 'Kritipur',
    status: 'Open',
    contact: '987654321',
    coordinates: { lat: 123123213, long: 1312312321 },
    consumption_today: 3000,
    distripution_today: 2500,
    log: [{
      date: '01/01/2017',
      consumption: 3000,
      distribution: 2500,
    }, {
      date: '01/02/2017',
      consumption: 5000,
      distribution: 3000,
    }, {
      date: '01/03/2017',
      consumption: 2000,
      distribution: 500,
    }]
  }],
};

const fillMeUpReducer = (state = fillMeUpState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    default:
      return newState;
  }
};

export default fillMeUpReducer;
