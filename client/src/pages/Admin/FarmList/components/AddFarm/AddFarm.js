import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, Select } from '@material-ui/core';
import { Button, TextField, Typography, MenuItem } from '@material-ui/core';
import styles from './styles';
import {
  getFarms,
  createFarms,
  updateFarms,
  removeFarms
} from '../../../../../store/actions/farms';
import { FileUpload } from '../../../../../components';

class AddFarm extends Component {
  state = {
    _id: '',
    name: '',
    image: null,
    produce: '',
    city: '',
    phone_no: '',
    notification: {}
  };

  componentDidMount() {
    if (this.props.editFarm) {
      const { image, ...rest } = this.props.editFarm;
      this.setState({ ...rest });
    }
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onSubmitAction = async type => {
    const {
      getFarms,
      createFarms,
      updateFarms,
      removeFarms
    } = this.props;
    const {
      _id,
      name,
      image,
      produce,
      city,
      phone_no
    } = this.state;
    const farm = { name, produce, city, phone_no};
    let notification = {};
    type === 'create'
      ? (notification = await createFarms(image, farm))
      : type === 'update'
      ? (notification = await updateFarms(image, farm, _id))
      : (notification = await removeFarms(_id));
    this.setState({ notification });
    if (notification && notification.status === 'success') getFarms();
  };

  handleSeatsChange = (index, value) => {
    if (value > 10) return;
    const { seats } = this.state;
    seats[index] = Array.from({ length: value }, () => 0);
    this.setState({
      seats
    });
  };

  render() {
    const { classes, className, products } = this.props;
    const {
      name,
      image,
      produce,
      city,
      phone_no,
      notification
    } = this.state;

    const rootClassName = classNames(classes.root, className);
    const mainTitle = this.props.editFarm ? 'Edit Farm' : 'Add Farm';
    const submitButton = this.props.editFarm
      ? 'Update Farm'
      : 'Save Details';
    const submitAction = this.props.editFarm
      ? () => this.onSubmitAction('update')
      : () => this.onSubmitAction('create');

    return (
      <div className={rootClassName}>
        <Typography variant="h4" className={classes.title}>
          {mainTitle}
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              helperText="Please specify the name of the farm"
              label="Name"
              margin="dense"
              required
              value={name}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('name', event.target.value)
              }
            />

            <TextField
              fullWidth
              className={classes.textField}
              label="Address"
              margin="dense"
              required
              variant="outlined"
              value={city}
              onChange={event =>
                this.handleFieldChange('city', event.target.value)
              }
            />
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

          <div className={classes.field}>
            <Select
              multiple
              displayEmpty
              className={classes.textField}
              label="Product"
              margin="dense"
              type="text"
              value={produce}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('produce', event.target.value)
              }
            >
              {products.map((typoItem, index) => (
                <MenuItem key={typoItem + '-' + index} value={typoItem}>
                  {typoItem}
                </MenuItem>
              ))}
            </Select>
            <TextField
              className={classes.textField}
              label="Phone number"
              margin="dense"
              required
              value={phone_no}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('phone_no', event.target.value)
              }
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
        {this.props.editFarm && (
          <Button
            color="secondary"
            className={classes.buttonFooter}
            variant="contained"
            onClick={() => this.onSubmitAction('remove')}>
            Delete Farm
          </Button>
        )}

        {notification && notification.status ? (
          notification.status === 'success' ? (
            <Typography
              className={classes.infoMessage}
              color="primary"
              variant="caption">
              {notification.message}
            </Typography>
          ) : (
            <Typography
              className={classes.infoMessage}
              color="error"
              variant="caption">
              {notification.message}
            </Typography>
          )
        ) : null}
      </div>
    );
  }
}

AddFarm.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = null;
const mapDispatchToProps = {
  getFarms,
  createFarms,
  updateFarms,
  removeFarms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddFarm));
