import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { sigInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.post, 'sessionStudents', {
      id,
    });
    const { id: student_id } = response.data;

    yield put(sigInSuccess(student_id));
  } catch (err) {
    yield put(signFailure());
    Alert.alert('Falha na autenticação, verifique seus dados');
  }
}

export function signOut() {}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
