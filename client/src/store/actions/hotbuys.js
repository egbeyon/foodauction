import {
    TOGGLE_DIALOG,
    SELECT_HOTBUYS,
    SELECT_ALL_HOTBUYS,
    GET_HOTBUYS,
    DELETE_HOTBUY
  } from '../types/hotbuys';
  import { setAlert } from './alert';
  
  export const toggleDialog = () => ({ type: TOGGLE_DIALOG });
  
  export const selectHotbuy = hotbuy => ({
    type: SELECT_HOTBUYS,
    payload: hotbuy
  });
  
  export const selectAllHotbuys = () => ({ type: SELECT_ALL_HOTBUYS });
  
  export const getHotbuys = () => async dispatch => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/hotbuys';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const hotbuys = await response.json();
      if (response.ok) {
        dispatch({ type: GET_HOTBUYS, payload: hotbuys });
      }
    } catch (error) {
      dispatch(setAlert(error.message, 'error', 5000));
    }
  };
  
  export const addHotbuy = hotbuy => async dispatch => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/hotbuys';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(hotbuy)
      });
      if (response.ok) {
        dispatch(setAlert('Hot-buy Created', 'success', 5000));
        return { status: 'success', message: 'Hot-buy Created' };
      }
    } catch (error) {
      dispatch(setAlert(error.message, 'error', 5000));
      return {
        status: 'error',
        message: ' Farm has not been saved, try again.'
      };
    }
  };
  
  export const updateHotbuy = (hotbuy, id) => async dispatch => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/hotbuys/' + id;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(hotbuy)
      });
      if (response.ok) {
        dispatch(setAlert('Hot-buy Created', 'success', 5000));
        return { status: 'success', message: 'Hot-buy Created' };
      }
    } catch (error) {
      dispatch(setAlert(error.message, 'error', 5000));
      return {
        status: 'error',
        message: ' Farm has not been saved, try again.'
      };
    }
  };
  
  export const deleteHotbuy = id => async dispatch => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/hotbuys/' + id;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        dispatch({ type: DELETE_HOTBUY, payload: id });
        dispatch(setAlert('Hot-buy Deleted', 'success', 5000));
        dispatch(getHotbuys());
        return { status: 'success', message: 'Hot-buy Removed' };
      }
    } catch (error) {
      dispatch(setAlert(error.message, 'error', 5000));
      return {
        status: 'error',
        message: ' Hotbuy have not been deleted, try again.'
      };
    }
  };
  