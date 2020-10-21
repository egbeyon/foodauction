import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Grid, Typography, Container } from '@material-ui/core';
import { getProducts, getReserves, getFarms } from '../../../store/actions';
import { MyReserveTable } from './components';
import Account from '../../Admin/Account';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  },
  [theme.breakpoints.down('sm')]: {
    fullWidth: { width: '100%' }
  }
}));

function MyDashboard(props) {
  const {
    user,
    reserves,
    products,
    farms,
    getProducts,
    getReserves,
    getFarms
  } = props;

  useEffect(() => {
    getProducts();
    getReserves();
    getFarms();
  }, [getProducts, getReserves, getFarms]);

  const classes = useStyles(props);

  const myReserves = reserves.filter(
    reserve => reserve.username === user.username
  );

  console.log(myReserves);

  return (
    <Container>
      <Grid container spacing={2}>
        {!!myReserves.length && (
          <>
            <Grid item xs={12}>
              <Typography
                className={classes.title}
                variant="h2"
                color="inherit">
                My Reserves
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <MyReserveTable
                reserves={myReserves}
                products={products}
                farms={farms}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h2" color="inherit">
            My Account
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Account />
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = ({
  authState,
  productState,
  reserveState,
  farmState
}) => ({
  user: authState.user,
  products: productState.products,
  reserves: reserveState.reserves,
  farms: farmState.farms
});

const mapDispatchToProps = { getProducts, getReserves, getFarms };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyDashboard);
