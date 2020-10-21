import { GET_FARMS, GET_FARM } from '../types';

const initialState = {
  farms: [],
  selectedFarm: null
};

const getFarms = (state, payload) => ({
  ...state,
  farms: payload
});

const getFarm = (state, payload) => ({
  ...state,
  selectedFarm: payload
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FARMS:
      return getFarms(state, payload);
    case GET_FARM:
      return getFarm(state, payload);
    default:
      return state;
  }
};
