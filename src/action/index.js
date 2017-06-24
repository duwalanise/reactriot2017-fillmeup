export const userLogin = user =>
  ({
    type: 'SET_LOGGED_IN_USER',
    payload: {
      user,
    },
  });

export const userLogOut = () =>
  ({
    type: 'REMOVED_LOGGED_IN_USER',
  });
