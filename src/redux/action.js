// actions.js
import { FETCHDATAERROR, FETCHDATAREQUEST, FETCHDATASUCCESS } from './actionTypes';

export const loadingAction = () => ({ type: FETCHDATAREQUEST });

export const errorAction = () => ({ type: FETCHDATAERROR });

export const successAction = (data) => ({
  type: FETCHDATASUCCESS,
  payload: data,
});

const url = 'http://localhost:8080/ProductPage';

export const fetchData = () => async (dispatch) => {
  dispatch(loadingAction());

  try {
    const response = await fetch(url);
    const result = await response.json();
   
    if(result){

        dispatch(successAction(result))
    }
  } catch (error) {
    dispatch(errorAction());
  }
};
