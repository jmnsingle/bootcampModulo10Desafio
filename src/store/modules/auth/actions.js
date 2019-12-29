export function sigInRequest(id) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { id },
  };
}

export function sigInSuccess(id) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { id },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOUt() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
