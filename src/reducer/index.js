const fillMeUpState = {

};

const fillMeUpReducer = (state = fillMeUpState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    default:
      return newState;
  }
};

export default fillMeUpReducer;
