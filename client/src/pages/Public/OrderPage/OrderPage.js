import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Grid, Container, Typography } from '@material-ui/core';
import {
  setSelectedFarm,
  setSelectedDate,
  setSelectedTime,
  toggleLoginPopup,
  resetCheckout,
  setAlert,
  setQRCode
} from '../../../store/actions';
import {getHotbuys} from '../../../store/actions/hotbuys'
import { addReserve, getReserves } from '../../../store/actions/reserves'
import { getProduct } from '../../../store/actions/products';
import { getFarm, getFarms, getFarmsUserModel } from '../../../store/actions/farms'
import { ResponsiveDialog } from '../../../components';
import LoginForm from '../Login/components/LoginForm';
import styles from './styles';
import ProductInfo from './components/ProductInfo/ProductInfo';
import OrderForm from './components/OrderForm/OrderForm';
import OrderCheckout from './components/OderCheckout/OrderCheckout';

class OrderPage extends Component {
  state = {
    requestedQuantity: 0,
    date: '',
    startAt: '',
    productPrice: '',
    productId: '',
    farmId: '',
    user: '',
    phone: ''
  }
  didSetSuggestion = false;

  componentDidMount() {
    const {
      user,
      match,
      getProduct,
      getFarms,
      getFarmsUserModel,
      getHotbuys,
      getReserves,
    } = this.props;

    getProduct(match.params.id);
    user ? getFarmsUserModel(user.username) : getFarms();
    getHotbuys();
    getReserves();
  }

   checkout() {
    const {
      product,
      selectedFarm,
      getReserves,
      user,
      resetCheckout
    } = this.props;

    console.log(this.state.requestedQuantity)

    const {
      date, startAt, productPrice, requestedQuantity
    } = this.state

    const response = {
      date: date,
      startAt: startAt,
      productPrice: productPrice,
      requestedQuantity: requestedQuantity,
      total: requestedQuantity * productPrice,
      productId: product._id,
      farmId: selectedFarm,
      username: user.username,
      phone: user.phone
    };
    console.log(response) 
    this.props.addReserve(response)
    
       getReserves();
       resetCheckout()
       window.location('/')
   }

  

  onFilterFarm() {
    const { farms, hotbuys, selectedFarm, selectedTime  } = this.props;
    const initialReturn = { uniqueFarms: [] };
    if (!hotbuys || !farms) return initialReturn;

    const uniqueFarmsId = hotbuys
      .filter(hotbuy =>
        selectedTime ? hotbuy.startAt === selectedTime : true
      )
      .map(hotbuy => hotbuy.farmId)
      .filter((value, index, self) => self.indexOf(value) === index);

    const uniqueFarms = farms.filter(farm =>
      uniqueFarmsId.includes(farm._id)
    );

    const uniqueTimes = hotbuys
      .filter(hotbuy =>
        selectedFarm ? selectedFarm === hotbuy.farmId : true
      )
      .map(hotbuy => hotbuy.startAt)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort(
        (a, b) => new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b)
      );

    return { ...initialReturn, uniqueFarms, uniqueTimes };
  }


  onChangeFarm = (e) =>  this.props.setSelectedFarm(e.target.value);
  onChangeDate = date => this.props.setSelectedDate(date);
  onChangeTime = event => this.props.setSelectedTime(event.target.value);
  onChangeQuant = (e) => {   
    this.setState({
      requestedQuantity: e.target.value
    })
  }
  shaDate = (dat) => {
    this.setState({ date: dat })
  }
  shaTime = (time) => {
    this.setState({ startAt: time })
  } 
  shaPrice = (val) => {
    this.setState({ productPrice: val})
  }
  shaPrid = (e) => {
    this.setState({ productId: e.target.value })
  }
  shaFid = (e) => {
    this.setState({ farmId: e.target.value })
  }

  render() {
    const {
      classes,
      user,
      product,
      hotbuys,
      selectedFarm,
      selectedDate,
      selectedTime,
      showLoginPopup,
      toggleLoginPopup,
    } = this.props;
    

    let eureka = hotbuys.find(hotbuy => hotbuy.farmId === selectedFarm)
    
    const { uniqueFarms, uniqueTimes } = this.onFilterFarm();
    return (
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={2} style={{ height: '100%' }}>
          <ProductInfo product={product} />
          <Grid item lg={9} xs={12} md={12}>
              <>
              {!product ? (
            <Typography variant="h6">There are no products to buy</Typography>
          ) : (
            <OrderCheckout
            eureka={eureka}
            user={user}
            price={product.price}
            quantity= {this.state.requestedQuantity}
            selectedFarm={this.onChangeFarm}
            onBook={() => this.checkout()}
            product={product}
            
            andReserve={() => this.andReserve()}
          />
          )}   
            </>

            <OrderForm
              farms={uniqueFarms}
              times={uniqueTimes}
              hotbuys={hotbuys}
              eureka={eureka}
              selectedFarm={selectedFarm}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onChangeFarm={this.onChangeFarm}
              onChangeDate={this.onChangeDate}
              onChangeTime={this.onChangeTime}
              quantity = {this.state.requestedQuantity}
              onChangeQuant={this.onChangeQuant}
              product={product}
              shaDate={this.shaDate}
              shaTime={this.shaTime}
              shaPrice={this.shaPrice}
              shaPrid={this.shaPrid}
              shaFid={this.shaFid}
            />
          </Grid>
        </Grid>
        <ResponsiveDialog
          id="Edit-cinema"
          open={showLoginPopup}
          handleClose={() => toggleLoginPopup()}
          maxWidth="sm">
          <LoginForm />
        </ResponsiveDialog>
      </Container>
    );
  }
}

OrderPage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (
  {
    authState,
    productState,
    farmState,
    hotbuyState,
    reserveState,
    checkoutState
  },
  ownProps
) => ({
  isAuth: authState.isAuthenticated,
  user: authState.user,
  product: productState.selectedProduct,
  farm: farmState.selectedFarm,
  farms: farmState.farms,
  hotbuys: hotbuyState.hotbuys.filter(
  hotbuy => hotbuy.productId === ownProps.match.params.id
  ),
  reserves: reserveState.reserves,
  selectedFarm: checkoutState.selectedFarm,
  selectedDate: checkoutState.selectedDate,
  selectedTime: checkoutState.selectedTime,
  showLoginPopup: checkoutState.showLoginPopup,
  QRCode: checkoutState.QRCode
});

const mapDispatchToProps = {
  getProduct,
  getFarm,
  getFarmsUserModel,
  getFarms,
  getHotbuys,
  getReserves,
  addReserve,
  setSelectedFarm,
  setSelectedDate,
  setSelectedTime,
  toggleLoginPopup,
  resetCheckout,
  setAlert,
  setQRCode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(OrderPage));
