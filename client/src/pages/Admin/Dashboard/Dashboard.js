import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid } from '@material-ui/core';
import {
  TotalUsers,
  TotalFarms,
  TotalProducts,
  TotalReservations,
  BestProducts,
  UsersByDevice
} from './components';
import {
  getUsers,
  getFarms,
  getProducts,
  getReserves
} from '../../../store/actions';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(4)
  }
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getFarms();
    this.props.getProducts();
    this.props.getReserves();
  }

  getBestProducts = (reserves, products, total = 5) => {
    const reserveCounter = reserves.map(reserve => ({
      productId: reserve.productId,
      count: reserves.filter(r => r.productId === reserve.productId).length
    }));

    const result = [];
    const map = new Map();
    for (const item of reserveCounter) {
      if (!map.has(item.productId)) {
        map.set(item.productId, true); // set any value to Map
        result.push({
          productId: item.productId,
          count: item.count
        });
      }
    }
    return result
      .sort((a, b) => b.count - a.count)
      .slice(0, total)
      .map(res => ({
        product: products.find(product => product._id === res.productId),
        count: res.count
      }));
  };

  render() {
    const { classes, users, farms, products, reserves } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalUsers users={users.length} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalFarms farms={farms.length} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProducts products={products.length} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalReservations reserves={reserves.length} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <BestProducts
              bestProducts={this.getBestProducts(reserves, products, 5)}
            />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <UsersByDevice />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({
  userState,
  farmState,
  productState,
  reserveState
}) => ({
  users: userState.users,
  farms: farmState.farms,
  products: productState.products,
  reserves: reserveState.reserves
});
const mapDispatchToProps = {
  getUsers,
  getFarms,
  getProducts,
  getReserves
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
