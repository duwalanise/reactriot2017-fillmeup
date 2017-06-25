import { closeMarkerInfo } from './../components/utilities/helper';

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
      if (action.payload) {
        const pumpInformation = Object.keys(action.payload).map(key => action.payload[key]);
        const pumpDetails = closeMarkerInfo(pumpInformation);
        return { ...state, pumpDetails };
      }
      return state;
    case 'UPDATE_MARKER_STATE' :
      return {
        ...state,
        pumpDetails: state.pumpDetails.map(pump =>
          ({ ...pump, isMarkerOpen: (pump.pumpId === action.payload) }),
        ),
      };
    default:
      return state;
  }
};

export default fillMeUpReducer;
