import { GET_PRODUCTS, SELECT_PRODUCT, GET_SUGGESTIONS } from '../types/products'
//import { onSelectProduct, getProductSuggestion } from '../actions/products';

const initialState = {
    products: [],
    randomProduct: null,
    latestProducts: [],
    nowReady: [],
    readyLater: [],
    selectedProduct: null,
    suggested: []
}

const getProducts = (state, payload) => {
    const latestProducts = payload
    .sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate))
    .slice(0, 5);

    const nowReady = payload.filter(
        product => 
            new Date(product.endDate) >= new Date() &&
            new Date(product.releaseDate) < new Date()
    )

    const readyLater = payload.filter(
        product => new Date(product.releaseDate) > new Date()
    )

    return {
        ...state, 
        products: payload,
        randomProduct: payload[Math.floor(Math.random() * payload.length)],
        latestProducts,
        nowReady,
        readyLater
    }
}

const onSelectProduct = (state, payload) => ({
    ...state,
    selectedProduct: payload
  });
  
  const getProductSuggestion = (state, payload) =>({
    ...state,
    suggested: payload
  })

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_PRODUCTS:
            return getProducts(state, payload);
        
        case SELECT_PRODUCT:
            return onSelectProduct(state, payload);

        case GET_SUGGESTIONS:
            return getProductSuggestion(state, payload);

        default:
            return state;
    }
}