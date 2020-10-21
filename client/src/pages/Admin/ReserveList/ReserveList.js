import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, CircularProgress } from '@material-ui/core';
import styles from './styles';
import ReservesTable from './components/ReservesTable/ReservesTable';
import ReservesToolbar from './components/ReservationsToolbar/ReservesToolbar';
import { getReserves } from '../../../store/actions/reserves';
import { getProducts } from '../../../store/actions/products';
import { getFarms } from '../../../store/actions/farms';
import ReservesCalendar from './components/ReservesCalendar/ReservesCalendar';
import { match } from '../../../utils';

class ReserveList extends Component {
  state = { mode: 'list', search: '' };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      reserves,
      products,
      farms,
      getReserves,
      getFarms
    } = this.props;

    if (!reserves.length) getReserves();
    if (!products.length) getProducts();
    if (!farms.length) getFarms();
  }

  onChangeMode = () =>
    this.setState(({ mode }) => ({ mode: mode === 'grid' ? 'list' : 'grid' }));

  onChangeSearch = e => this.setState({ search: e.target.value });

  render() {
    const { mode, search } = this.state;
    const { classes, reserves, products, farms } = this.props;

    const filteredReserves = match(search, reserves, 'phone');

    return (
      <div className={classes.root}>
        <ReservesToolbar
          reserves={filteredReserves}
          search={search}
          onChangeSearch={this.onChangeSearch}
          mode={mode}
          onChangeMode={this.onChangeMode}
        />
        <div className={classes.content}>
          {!filteredReserves.length ? (
            <div className={classes.progressWrapper}>
              <CircularProgress />
            </div>
          ) : mode === 'list' ? (
            <ReservesTable
              reserves={filteredReserves}
              products={products}
              farms={farms}
            />
          ) : (
            <ReservesCalendar
              reserves={filteredReserves}
              products={products}
              farms={farms}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ reserveState, productState, farmState }) => ({
  reserves: reserveState.reserves,
  products: productState.products,
  farms: farmState.farms
});

const mapDispatchToProps = {
  getReserves,
  getProducts,
  getFarms
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ReserveList));
