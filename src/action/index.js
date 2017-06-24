export const updateGoogleSessionInfo = (user, token) =>
  ({
    type: 'UPDATE_GOOGLE_SESSION_INFO',
    payload: {
      user,
      token,
    },
  });
