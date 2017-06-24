const fillMeUpState = {
  googleMapSetting: {
    center: [27.6795718, 85.3171355],
    zoom: 12,
  },
  googleSessionInfo: {
    user: {},
    token: '',
  },
  pumpDetails: [],
  userDetail: null,
};

const fillMeUpReducer = (state = fillMeUpState, action) => {
  switch (action.type) {
    case 'SET_LOGGED_IN_USER' :
      return { ...state, userDetail: action.payload.user };
    case 'REMOVED_LOGGED_IN_USER' :
      return { ...state, userDetail: null };
    case 'STORE_PUMP_DETAILS' :
      const pumpDetails = Object.keys(action.payload).map(key => action.payload[key]);
      return { ...state, pumpDetails };
    default:
      return state;
  }
};

export default fillMeUpReducer;
