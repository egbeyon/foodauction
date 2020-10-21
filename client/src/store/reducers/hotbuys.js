import {
    GET_HOTBUYS,
    TOGGLE_DIALOG,
    SELECT_HOTBUYS,
    SELECT_ALL_HOTBUYS,
    DELETE_HOTBUY
  } from '../types/hotbuys';
  
  const initialState = {
    hotbuys: [],
    randomHotbuy: null,
    selectedHotbuys: [],
    openDialog: false
  };
  
  const getHotbuys = (state, payload) => ({
    ...state,
    hotbuys: payload,
    randomHotbuy: payload[Math.floor(Math.random() * payload.length)],
  });
  
  const toggleDialog = state => ({
    ...state,
    openDialog: !state.openDialog
  });
  
  const selectHotbuy = (state, payload) => {
    const { selectedHotbuys } = state;
  
    const selectedIndex = selectedHotbuys.indexOf(payload);
    let newSelected = [];
  
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedHotbuys, payload);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedHotbuys.slice(1));
    } else if (selectedIndex === selectedHotbuys.length - 1) {
      newSelected = newSelected.concat(selectedHotbuys.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedHotbuys.slice(0, selectedIndex),
        selectedHotbuys.slice(selectedIndex + 1)
      );
    }
  
    return {
      ...state,
      selectedHotbuys: newSelected
      
    };
  };
  
  const selectAllHotbuys = state => ({
    ...state,
    selectedHotbuys: !state.selectedHotbuys.length
      ? state.hotbuys.map(hotbuy => hotbuy._id)
      : []
  });
  
  const deleteHotbuy = (state, payload) => ({
    ...state,
    selectedHotbuys: state.selectedHotbuys.filter(
      element => element !== payload
    )
  });
  
  export default (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_HOTBUYS:
        return getHotbuys(state, payload);
      case TOGGLE_DIALOG:
        return toggleDialog(state);
      case SELECT_HOTBUYS:
        return selectHotbuy(state, payload);
      case SELECT_ALL_HOTBUYS:
        return selectAllHotbuys(state);
      case DELETE_HOTBUY:
        return deleteHotbuy(state, payload);
      default:
        return state;
    }
  };
  