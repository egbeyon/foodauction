import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography, Select } from '@material-ui/core';
import { Button, TextField, MenuItem } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import styles from './styles';
import { typoData } from '../../../../../data/ProductDataService';
import {
  addProduct,
  updateProduct,
  removeProduct
} from '../../../../../store/actions/products';
import FileUpload from '../../../../../components/FileUpload/FileUpload';

class AddProduct extends Component {
  state = {
    name: '',
    image: null,
    typo: [],
    quantity: '',
    price: '',
    description: '',
    releaseDate: new Date(),
    endDate: new Date()

  };

  componentDidMount() {
    if (this.props.edit) {
      const {
        name,
        image,
        typo,
        quantity,
        price,
        description,
        releaseDate,
        endDate

      } = this.props.edit;
      this.setState({
        name,
        image,
        typo: typo.split(','),
        quantity,
        price,
        description,
        releaseDate,
        endDate
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      const { name, typo, quantity } = this.props.product;
      this.setState({ name, typo, quantity });
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

  onAddProduct = () => {
    const { image, typo, ...rest } = this.state;
    const product = { ...rest, typo: typo.join(',') };
    this.props.addProduct(image, product);
  };

  onUpdateProduct = () => {
    const { image, typo, ...rest } = this.state;
    const product = { ...rest, typo: typo.join(',') };
    this.props.updateProduct(this.props.edit._id, product, image);
  };

  onRemoveProduct = () => this.props.removeProduct(this.props.edit._id);

  render() {
    const { classes, className } = this.props;

    const {
        name,
        image,
        typo,
        quantity,
        price,
        description,
        releaseDate,
        endDate
    } = this.state;

    const rootClassName = classNames(classes.root, className);
    const optios = this.props.edit ? 'Edit Product' : 'Add Product';
    const submitButton = this.props.edit ? 'Update Product' : 'Save Details';
    const submitAction = this.props.edit
      ? () => this.onUpdateProduct()
      : () => this.onAddProduct();

    return (
      <div className={rootClassName}>
        <Typography variant="h4" className={classes.name}>
          {optios}
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              helperText="Please specify the name"
              label="Name"
              margin="dense"
              required
              value={name}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('name', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <Select
              multiple
              displayEmpty
              className={classes.textField}
              label="Category"
              margin="dense"
              required
              value={typo}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('typo', event.target.value)
              }>
              {typoData.map((typoItem, index) => (
                <MenuItem key={typoItem + '-' + index} value={typoItem}>
                  {typoItem}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className={classes.field}>
            <TextField
              fullWidth
              multiline
              className={classes.textField}
              label="Description"
              margin="dense"
              required
              variant="outlined"
              value={description}
              onChange={event =>
                this.handleFieldChange('description', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
          <TextField
              className={classes.textField}
              label="Available Quantity"
              margin="dense"
              required
              value={quantity}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('quantity', event.target.value)
              }
            />

            <TextField
              className={classes.textField}
              label="Price per quantity"
              margin="dense"
              type="number"
              value={price}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('price', event.target.value)
              }
            />
          </div>
          <div className={classes.field}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                className={classes.textField}
                inputVariant="outlined"
                margin="normal"
                id="release-date"
                label="Ready Date"
                value={releaseDate}
                onChange={date =>
                  this.handleFieldChange('releaseDate', date._d)
                }
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
                value={endDate}
                onChange={date => this.handleFieldChange('endDate', date._d)}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.field}>
            <FileUpload
              className={classes.textField}
              file={image}
              onUpload={event => {
                const file = event.target.files[0];
                this.handleFieldChange('image', file);
              }}
            />
          </div>
        </form>

        <Button
          className={classes.buttonFooter}
          color="primary"
          variant="contained"
          onClick={submitAction}>
          {submitButton}
        </Button>
        {this.props.edit && (
          <Button
            color="secondary"
            className={classes.buttonFooter}
            variant="contained"
            onClick={this.onRemoveProduct}>
            Delete Product
          </Button>
        )}
      </div>
    );
  }
}

AddProduct.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  product: PropTypes.object
};

const mapStateToProps = ({ productState, farmState }) => ({
  products: productState.products,
  farms: farmState.farms
});

const mapDispatchToProps = { addProduct, updateProduct, removeProduct };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddProduct));
