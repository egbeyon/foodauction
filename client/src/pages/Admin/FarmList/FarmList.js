import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFarms } from '../../../store/actions/farms';
import { withStyles } from '@material-ui/core';
import { CircularProgress, Grid } from '@material-ui/core';
import { AddFarm, FarmToolbar } from './components';
import { ResponsiveDialog } from '../../../components';
import styles from './styles';
import FarmCard from '../../Public/components/FarmCard/FarmCard';
import { match } from '../../../utils';

class FarmList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editFarm: null,
      openEditDialog: false,
      search: ''
    };
  }

  componentDidMount() {
    const { farms, getFarms } = this.props;
    if (!farms.length) getFarms();
  }

  openEditDialog = farm => {
    this.setState({ openEditDialog: true, editFarm: farm });
  };

  CloseEditDialog = () => {
    this.setState({ openEditDialog: false, editFarm: null });
  };

  editFarm(farm) {
    this.OpenEditDialog(farm);
  }

  render() {
    const { classes, farms } = this.props;
    const { editFarm, search } = this.state;
    const filteredFarms = match(search, farms, 'name');
    return (
      <div className={classes.root}>
        <FarmToolbar
          search={this.state.search}
          onChangeSearch={e => this.setState({ search: e.target.value })}
        />
        <div className={classes.content}>
          {filteredFarms.length === 0 ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3}>
              {filteredFarms.map(farm => (
                <Grid
                  item
                  key={farm._id}
                  lg={4}
                  md={6}
                  xs={12}
                  onClick={() => this.openEditDialog(farm)}>
                  <FarmCard farm={farm} />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
        <ResponsiveDialog
          id="Edit-farm"
          open={this.state.openEditDialog}
          handleClose={() => this.CloseEditDialog()}>
          <AddFarm
            editFarm={editFarm}
            handleClose={() => this.CloseEditDialog()}
          />
        </ResponsiveDialog>
      </div>
    );
  }
}

FarmList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ farmState }) => ({
  farms: farmState.farms
});

const mapDispatchToProps = { getFarms };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FarmList));
