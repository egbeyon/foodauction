import { GET_FARMS, GET_FARM } from '../types';
import { setAlert } from './alert';

export const uploadFarmImage = (id, image) => async dispatch => {
  try {
    const data = new FormData();
    data.append('file', image);
    const url = '/farms/photo/' + id;
    const response = await fetch(url, {
      method: 'POST',
      body: data
    });
    const responseData = await response.json();
    if (response.ok) {
      dispatch(setAlert('Image Uploaded', 'success', 5000));
    }
    if (responseData.error) {
      dispatch(setAlert(responseData.error.message, 'error', 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const getFarms = () => async dispatch => {
  try {
    const url = '/farms';
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const farms = await response.json();
    if (response.ok) {
      dispatch({ type: GET_FARMS, payload: farms });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const getFarm = id => async dispatch => {
  try {
    const url = '/farms/' + id;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const farm = await response.json();
    if (response.ok) {
      dispatch({ type: GET_FARM, payload: farm});
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const createFarms = (image, newFarm) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/farms';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFarm)
    });
    const farm = await response.json();
    if (response.ok) {
      dispatch(setAlert('Farm Created', 'success', 5000));
      if (image) dispatch(uploadFarmImage(farm._id, image));
      dispatch(getFarms());
      return { status: 'success', message: 'Farm Created' };
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: 'Farm has not been saved, try again.'
    };
  }
};

export const updateFarms = (image, farm, id) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/farms/' + id;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(farm)
    });
    if (response.ok) {
      dispatch(setAlert('Farm Updated', 'success', 5000));
      if (image) dispatch(uploadFarmImage(id, image));
      return { status: 'success', message: 'Farm is Updated' };
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: 'Farm has not been updated, try again.'
    };
  }
};

export const removeFarms = id => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/farms/' + id;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      dispatch(setAlert('Farm is Deleted', 'success', 5000));
      return { status: 'success', message: 'Farm is Removed' };
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: 'Farm has not been deleted, try again.'
    };
  }
};

export const getFarmsUserModel = username => async dispatch => {
  try {
    const url = '/farms/usermodeling/' + username;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const farms = await response.json();
    if (response.ok) {
      dispatch({ type: GET_FARMS, payload: farms });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};
