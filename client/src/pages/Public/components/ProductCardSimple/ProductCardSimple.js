import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    backgroundColor: 'transparent',
    borderRadius: 0,
    color: theme.palette.common.white,
    boxShadow: 'unset'
  },
  media: {
    height: 300
  },
  h5: {
    textTransform: 'capitalize'
  }
}));

const ProductCardSimple = props => {
  const classes = useStyles();
  const { product } = props;

  return (
    <Link to={`product/${product._id}`} style={{ textDecoration: 'none' }}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.image}
            title={product.name}
          ><img className={classes.blurBackground} alt="product" 
          src={product.image} /></CardMedia>
          <CardContent>
            <Typography
              className={classes.h5}
              gutterBottom
              variant="h5"
              component="h2"
              color="inherit">
              {product.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

ProductCardSimple.propTypes = {
  product: PropTypes.object.isRequired
};
export default ProductCardSimple;
