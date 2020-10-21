import { GET_RESERVES } from '../types/reserve'
import { setAlert } from './alert';

export const getReserves = () => async dispatch => {
    try {
        const token = localStorage.getItem('jwtToken')
        const url = '/reserves'
        const response = await fetch(url, {
            method: 'GET',
            headers: {
        Authorization: `Bearer ${token}`
        }
    })
    const reserves = await response.json()
    if (response.ok) {
        dispatch({ type: GET_RESERVES, payload: reserves })
    }
} catch (error) {
    dispatch(setAlert(error.message, 'error', 5000))
}
}

export const addReserve = reserve => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken')
    const url = '/reserves'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(reserve)
  })
    if (response.ok) {
      const { reserve } = await response.json();
      dispatch(setAlert('Reservation Created', 'success', 5000));
      return {
          status: 'success',
          message: 'Reservation Created',
          data: { reserve }
      }
      }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Reservation has not been created, try again.'
    };
}

}

export const updateReservation = (reserve, id) => async dispatch => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/reserves/' + id;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reserve)
      });
      if (response.ok) {
        dispatch(setAlert('Reservation Updated', 'success', 5000));
        return { status: 'success', message: 'Reservation Updated' };
      }
    } catch (error) {
      dispatch(setAlert(error.message, 'error', 5000));
      return {
        status: 'error',
        message: ' Reservation have not been updated, try again.'
      };
    }
  };

  export const removeReserve = id => async dispatch => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/reserves/' + id;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        dispatch(setAlert('Reservation Deleted', 'success', 5000));
        return { status: 'success', message: 'Reservation Removed' };
      }
    } catch (error) {
      dispatch(setAlert(error.message, 'error', 5000));
      return {
        status: 'error',
        message: ' Reservation have not been deleted, try again.'
      };
    }
  };