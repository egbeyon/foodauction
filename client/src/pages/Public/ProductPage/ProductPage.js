import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductBanner from '../components/ProductBanner/ProductBanner';
import { getProduct, onSelectProduct } from '../../../store/actions/products';

class ProductPage extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.onSelectProduct(null);
  }

  render() {
    const { product } = this.props;
    return <>{product && <ProductBanner product={product} fullDescription />}</>;
  }
}

ProductPage.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object.isRequired
};

const mapStateToProps = ({ productState }) => ({
  product: productState.selectedProduct
});

const mapDispatchToProps = { getProduct, onSelectProduct };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage);
