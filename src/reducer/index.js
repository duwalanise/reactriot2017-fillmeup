const fillMeUpState = {
  googleMapSetting: {
    center: [27.6795718, 85.3171355],
    zoom: 12,
  },
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
