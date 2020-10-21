import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Box, Grid } from '@material-ui/core';
import { getProducts } from '../../../store/actions/products';
import { getHotbuys } from '../../../store/actions/hotbuys';
import ProductCarousel from '../components/ProductCarousel/ProductCarousel';
import ProductBanner from '../components/ProductBanner/ProductBanner';
import styles from './styles';

class HomePage extends Component {
  componentDidMount() {
    const {
      products,
      hotbuys,
      getProducts,
      getHotbuys
    } = this.props;
    if (!products.length) getProducts();
    if (!hotbuys.length) getHotbuys();  
  }

  render() {
    const {
      classes,
      randomProduct,
      randomHotbuy,
      readyLater,
      nowReady,
      hotbuys
    } = this.props; 
    console.log(randomHotbuy)
    return (
      <Fragment>
        <ProductBanner product={randomProduct} hotbuy={randomHotbuy} hotbuys={hotbuys} height="85vh" />
        <br />
        <Box height={60} />
        <ProductCarousel
          carouselClass={classes.carousel}
          title="Available"
          to="/product/category/nowReady"
          products={nowReady}
        />
        <ProductCarousel
          carouselClass={classes.carousel}
          title="Book your Spot"
          to="/product/category/readyLater"
          products={readyLater}
        />
        {false && (
          <Grid container style={{ height: 500 }}>
            <Grid item xs={7} style={{ background: '#131334' }}></Grid>
            <Grid item xs={5} style={{ background: '#010025' }}></Grid>
          </Grid>
        )}
      </Fragment>
    );
  }
}

HomePage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  hotbuys: PropTypes.array.isRequired,
  latestProducts: PropTypes.array.isRequired
};

const mapStateToProps = ({ productState, hotbuyState, authState }) => ({
  products: productState.products,
  randomProduct: productState.randomProduct,
  randomHotbuy: hotbuyState.randomHotbuy,
  latestProducts: productState.latestProducts,
  readyLater: productState.readyLater,
  nowReady: productState.nowReady,
  hotbuys: hotbuyState.hotbuys,
  user: authState.user
});

const mapDispatchToProps = { getProducts, getHotbuys };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HomePage));
