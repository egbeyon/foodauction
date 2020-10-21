import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import styles from './styles';
import { AddHotbuy, HotbuyToolbar, HotbuyTable } from './components';
import {
  getHotbuys,
  toggleDialog,
  selectHotbuy,
  selectAllHotbuys,
  deleteHotbuy
} from '../../../store/actions/hotbuys';
import { ResponsiveDialog } from '../../../components';

class HotbuyList extends Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { hotbuys, getHotbuys } = this.props;
    if (!hotbuys.length) getHotbuys();
  }

  handleDeleteShowtime = () => {
    const { selectedHotbuys, deleteHotbuy } = this.props;
    selectedHotbuys.forEach(element => deleteHotbuy(element));
  };

  render() {
    const {
      classes,
      hotbuys,
      selectedHotbuys,
      openDialog,
      toggleDialog,
      selectHotbuy,
      selectAllHotbuys
    } = this.props;

    return (
      <div className={classes.root}>
        <HotbuyToolbar
          hotbuys={hotbuys}
          toggleDialog={toggleDialog}
          selectedHotbuys={selectedHotbuys}
          deleteHotbuy={this.handleDeleteHotbuy}
        />
        <div className={classes.content}>
          {!hotbuys.length ? (
            <Typography variant="h6">There are no hot buys</Typography>
          ) : (
            <HotbuyTable
              onSelectHotbuy={selectHotbuy}
              selectedHotbuys={selectedHotbuys}
              selectAllHotbuys={selectAllHotbuys}
              hotbuys={hotbuys}
            />
          )}
        </div>
        <ResponsiveDialog
          id="Add-hotbuy"
          open={openDialog}
          handleClose={() => toggleDialog()}>
          <AddHotbuy
            selectedHotbuy={hotbuys.find(
              hotbuy => hotbuy._id === selectedHotbuys[0]
            )}
          />
        </ResponsiveDialog>
      </div>
    );
  }
}

const mapStateToProps = ({ hotbuyState }) => ({
  openDialog: hotbuyState.openDialog,
  hotbuys: hotbuyState.hotbuys,
  selectedHotbuys: hotbuyState.selectedHotbuys
});

const mapDispatchToProps = {
  getHotbuys,
  toggleDialog,
  selectHotbuy,
  selectAllHotbuys,
  deleteHotbuy
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HotbuyList));
