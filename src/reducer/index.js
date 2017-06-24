const fillMeUpState = {
  googleMapSetting: {
    center: [27.6795718, 85.3171355],
    zoom: 12,
  },
  googleSessionInfo: {
    user: {},
    token: '',
  },
};

const fillMeUpReducer = (state = fillMeUpState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    default:
      return newState;
  }
};

export default fillMeUpReducer;
