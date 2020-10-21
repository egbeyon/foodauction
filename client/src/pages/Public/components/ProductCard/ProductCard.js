import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import { textTruncate } from '../../../../utils';
import { Link } from 'react-router-dom';

const ProductCard = props => {
  const { classes, product } = props;

  return (
    <Link to={`product/${product._id}`} style={{ textDecoration: 'none' }}>
      <div className={classes.card}>
            <div className={classes.blurBackground}>
                <img alt="product" 
                src={product.image} />
            </div>
        <div className={classes.body}>
          <p>{product.price}</p>
          <h2>{product.name}</h2>
          <p>{product.endDate}</p>
          <p>{textTruncate(product.description)}</p>
        </div>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};
export default withStyles(styles)(ProductCard);
