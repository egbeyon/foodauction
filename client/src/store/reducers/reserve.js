import { GET_RESERVES } from '../types/reserve'

const initialState = {
    reserves: []
}

const getReserves = (state, payload) => ({
    ...state,
    reserves: payload
})

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_RESERVES:
            return getReserves(state, payload);
        default:
            return state;
    }
}