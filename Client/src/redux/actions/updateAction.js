import {CAP_NHAT_EMAIL, CAP_NHAT_ID} from '../reducers/infoReducers';

export const updateEmail = email => async dispatch => {
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
    console.log('DA CAP NHAT EMAIL LEN SERVER');

    dispatch({
      type: CAP_NHAT_EMAIL,
      email: email,
    });
  } catch (err) {}
};
