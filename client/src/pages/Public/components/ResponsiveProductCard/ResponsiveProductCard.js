import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Typography } from '@material-ui/core';
import styles from './styles';
import { textTruncate } from '../../../../utils';
import { Link } from 'react-router-dom';

const ProductCard = props => {
  const { classes, product } = props;

  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
      <Paper className={classes.productCard} elevation={20}>
        <div className={classes.infoSection}>
          <header className={classes.productHeader}>
            <Typography
              className={classes.productName}
              variant="h1"
              color="inherit">
              {product.name}
            </Typography>
            <Typography
              className={classes.price}
              variant="h4"
              color="inherit">
               {product.quantity}
            </Typography>
            <Typography
              className={classes.price}
              variant="body1"
              color="inherit">
              #{product.price} 
            </Typography>
            <Typography
              className={classes.typo}
              variant="body1"
              color="inherit">
              {product.typo}
            </Typography>
          </header>

          <div className={classes.description}>
            <Typography
              className={classes.descriptionText}
              variant="body1"
              color="inherit">
              {textTruncate(product.description, 250)}
            </Typography>
          </div>
        </div>
        <img className={classes.blurBackground} alt="product" 
        src={product.image} />
      
      </Paper>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};
export default withStyles(styles)(ProductCard);
