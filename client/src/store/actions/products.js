import { GET_PRODUCTS, SELECT_PRODUCT, GET_SUGGESTIONS } from '../types/products';
import { setAlert } from './alert';
//import axios from 'axios'

export const uploadProductImage = (id, image) => async dispatch => {
    try {
        const data = new FormData();
        data.append('file', image);
        const url = '/products/photo/' +id;
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
}

export const getProducts = () => async dispatch => {
  try {
    const url = '/products';
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const products = await response.json();
    if (response.ok) {
      dispatch({ type: GET_PRODUCTS, payload: products });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};


export const getProduct = id => async dispatch => {
    try {
        const url = '/products/' + id;
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const product = await response.json();
        if (response.ok) {
            dispatch({type: SELECT_PRODUCT, payload: product})
        }
    } catch (error) {
        dispatch(setAlert(error.message, 'error', 5000))
    }
}

export const onSelectProduct = product => ({
    type: SELECT_PRODUCT,
    payload: product
})

export const getProductSuggestion = id => async dispatch => {
    try {
        const url = '/products/usermodeling/' +id;
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const products = await response.json()
        if (response.ok) {
            dispatch({ type: GET_SUGGESTIONS, payload: products})
        }
    } catch (error) {
        dispatch(setAlert(error.message, 'error', 5000))
    }
}

export const addProduct = (image, newProduct) => async dispatch => {
    try {
        const token = localStorage.getItem('jwtToken');
        const url = '/products';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newProduct)
        });
        const product = await response.json()
        if (response.ok) {
            dispatch(setAlert('Product has been saved!', 'success', 5000));
            if (image) dispatch(uploadProductImage(product._id, image));
            dispatch(getProducts());
        }
    } catch (error) {
        dispatch(setAlert(error.message, 'error', 5000))
        return {
            status: 'error',
            message: 'Product has not been saved, try later'
        }
    }
}

export const updateProduct = (productId, product, image) => async dispatch => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/products/' + productId;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      if (response.ok) {
        dispatch(onSelectProduct(null));
        dispatch(setAlert('Product has been saved!', 'success', 5000));
        if (image) dispatch(uploadProductImage(productId, image));
        dispatch(getProducts());
      }
    } catch (error) {
      dispatch(setAlert(error.message, 'error', 5000));
      return {
        status: 'error',
        message: ' Product has not been updated, try again.'
      };
    }
  };

  export const removeProduct = productId => async dispatch => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/products/' + productId;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        dispatch(getProducts());
        dispatch(onSelectProduct(null));
        dispatch(setAlert('Product has been Deleted!', 'success', 5000));
      }
    } catch (error) {
      dispatch(setAlert(error.message, 'error', 5000));
    }
  };