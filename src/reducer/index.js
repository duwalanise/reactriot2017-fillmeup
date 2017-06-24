const fillMeUpState = {
  googleMapSetting: {
    center: [27.6795718, 85.3171355],
    zoom: 12,
  },
  googleSessionInfo: {
    user: {},
    token: '',
  },
  pumpDetails: [{
    pumpId: 'abcdefg',
    uid: '1234567',
    name: 'Rajat Petrol Service',
    address: 'Kritipur',
    open_hours: '6a.m. - 7p.m.',
    latitude: '27.6795718',
    longitude: '85.3171355',
    status: 'Open',
    contact: '987654321',
    coordinates: { lat: 123123213, long: 1312312321 },
    consumptionToday: 3000,
    distriputionToday: 4500,
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
    }],
  }],
  userDetail: null,
};

const fillMeUpReducer = (state = fillMeUpState, action) => {
  switch (action.type) {
    case 'SET_LOGGED_IN_USER' :
      return { ...state, userDetail: action.payload.user };
    case 'REMOVED_LOGGED_IN_USER' :
      return { ...state, userDetail: null };
    default:
      return state;
  }
};

export default fillMeUpReducer;
