import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { CircularProgress, Grid } from '@material-ui/core';
import { ProductToolbar, ProductCard } from './components';
import { ResponsiveDialog } from '../../../components';
import styles from './styles';
import AddProduct from './components/AddProduct/AddProduct';
import { getProducts, onSelectProduct } from '../../../store/actions/products';
import { match } from '../../../utils';

class ProductList extends Component {
  state = { search: '' };
  componentDidMount() {
    const { products, getProducts } = this.props;
    console.log(products)
    if (!products.length) getProducts();
  }

  renderProducts() {
    const { classes } = this.props;
    
    const products = match(this.state.search, this.props.products, 'name');
    
   
    if (!products.length) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }
    return (
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid
            item
            key={product._id}
            lg={4}
            md={6}
            xs={12}
            onClick={() => this.props.onSelectProduct(product)}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    );
  }

  render() {
    const { classes, selectedProduct } = this.props;
    return (
      <div className={classes.root}>
        <ProductToolbar
          search={this.state.search}
          onChangeSearch={e => this.setState({ search: e.target.value })}
        />
        <div className={classes.content}>{this.renderProducts()}</div>
        <ResponsiveDialog
          id="Edit-product"
          open={Boolean(selectedProduct)}
          handleClose={() => this.props.onSelectProduct(null)}>
          <AddProduct edit={selectedProduct} />
        </ResponsiveDialog>
      </div>
    );
  }
}

ProductList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ productState }) => ({
  products: productState.products,
  latestProducts: productState.latestProducts,
  readyLater: productState.readyLater,
  nowReady: productState.nowReady,
  selectedProduct: productState.selectedProduct
});

const mapDispatchToProps = { getProducts, onSelectProduct };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProductList));
