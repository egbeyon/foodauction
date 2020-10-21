import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import { Button, TextField, MenuItem } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import styles from './styles';
import { addHotbuy, updateHotbuy } from '../../../../../store/actions/hotbuys';

class AddHotbuy extends Component {
  state = {
    startAt: '',
    startDate: null,
    endDate: null,
    productId: '',
    farmId: '',
    quantity: 0,
    metric: ''
  };

  componentDidMount() {
    if (this.props.selectedHotbuy) {
      const {
        startAt,
        startDate,
        endDate,
        productId,
        farmId,
        quantity,
        metric
      } = this.props.selectedHotbuy;
      this.setState({
        startAt,
        startDate,
        endDate,
        productId,
        farmId,
        quantity,
        metric
      });
    }
  }

  handleChange = e => {
    this.setState({
      state: e.target.value
    });
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onAddHotbuy = () => {
    const { startAt, startDate, endDate, productId, farmId, quantity, metric } = this.state;
    const hotbuy = {
      startAt,
      startDate,
      endDate,
      productId,
      farmId,
      quantity,
      metric
    };
    this.props.addHotbuy(hotbuy);
  };

  onUpdateHotbuy = () => {
    const { startAt, startDate, endDate, productId, farmId, quantity, metric } = this.state;
    const hotbuy = {
      startAt,
      startDate,
      endDate,
      productId,
      farmId,
      quantity,
      metric
    };
    this.props.updateHotbuy(hotbuy, this.props.selectedHotbuy._id);
  };

  onFilterMinDate = () => {
    const { products } = this.props;
    const { productId } = this.state;
    const selectedProduct = products.find(product => product._id === productId);
    if (selectedProduct) return selectedProduct.startDate;
    return new Date();
  };

  onFilterMaxDate = () => {
    const { products } = this.props;
    const { productId } = this.state;
    const selectedProduct = products.find(product => product._id === productId);
    if (selectedProduct) return new Date(selectedProduct.endDate);
    return false;
  };

  render() {
    const { farms, classes, className, products } = this.props;
    const { startAt, startDate, endDate, productId, farmId, quantity, metric } = this.state;

    const rootClassName = classNames(classes.root, className);
    const title = this.props.selectedHotbuy
      ? 'Edit Hotbuy'
      : 'Add Hotbuy';
    const submitButton = this.props.selectedHotbuy
      ? 'Update Hotbuy'
      : 'Save Details';
    const submitAction = this.props.selectedHotbuy
      ? () => this.onUpdateHotbuy()
      : () => this.onAddHotbuy();

    return (
      <div className={rootClassName}>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              fullWidth
              select
              className={classes.textField}
              helperText="Please specify the Time"
              label="Time"
              margin="dense"
              required
              value={startAt}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('startAt', event.target.value)
              }>
              {['18:00', '19:00', '20:00', '21:00', ' 22:00', '23:00'].map(
                time => (
                  <MenuItem key={`time-${time}`} value={time}>
                    {time}
                  </MenuItem>
                )
              )}
            </TextField>
          </div>
          <div className={classes.field}>
            <TextField
              fullWidth
              select
              className={classes.textField}
              label="Product"
              margin="dense"
              required
              value={productId}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('productId', event.target.value)
              }>
              {products.map(product => (
                <MenuItem key={product._id} value={product._id}>
                  {product.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              select
              className={classes.textField}
              label="Farm"
              margin="dense"
              required
              value={farmId}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('farmId', event.target.value)
              }>
              {farms.map(farm => (
                <MenuItem key={farm._id} value={farm._id}>
                  {farm.name}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className={classes.field}>
            <TextField
              className={classes.textField}
              label="metric"
              margin="dense"
              required
              value={metric}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('metric', event.target.value)
              } />

            <TextField
              className={classes.textField}
              label="Quantity"
              margin="dense"
              type="Number"
              required
              value={quantity}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('quantity', event.target.value)
              } />
          </div>

          <div className={classes.field}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                className={classes.textField}
                inputVariant="outlined"
                margin="normal"
                id="start-date"
                label="Start Date"
                minDate={new Date()}
                maxDate={this.onFilterMaxDate()}
                value={startDate}
                onChange={date => this.handleFieldChange('startDate', date._d)}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />

              <KeyboardDatePicker
                className={classes.textField}
                inputVariant="outlined"
                margin="normal"
                id="end-date"
                label="End Date"
                minDate={new Date(startDate)}
                maxDate={this.onFilterMaxDate()}
                value={endDate}
                onChange={date => this.handleFieldChange('endDate', date._d)}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </form>

        <Button
          className={classes.buttonFooter}
          color="primary"
          variant="contained"
          onClick={submitAction}>
          {submitButton}
        </Button>
      </div>
    );
  }
}

AddHotbuy.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ productState, farmState }) => ({
  products: productState.products,
  nowReady: productState.nowReady,
  farms: farmState.farms,
  readyLater: productState.readyLater
});

const mapDispatchToProps = { addHotbuy, updateHotbuy };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddHotbuy));
