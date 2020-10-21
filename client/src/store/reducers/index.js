import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import users from './users';
import hotbuys from './hotbuys';
import checkout from './checkout';
import farms from './farms';
import products from './products'
import reserves from './reserve'

export default combineReducers({
  alertState: alert,
  authState: auth,
  userState: users,
  reserveState: reserves,
  hotbuyState: hotbuys,
  checkoutState: checkout,
  farmState: farms,
  productState: products

});
