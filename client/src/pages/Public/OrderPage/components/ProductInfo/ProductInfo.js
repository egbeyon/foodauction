import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  productInfos: {
    background: 'rgba(57, 61, 67, 0.5)',
    position: 'relative',
    height: '100%'
  },
  background: {
    position: 'absolute',
    opacity: 0.4,
    top: 0,
    height: '70%',
    right: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    zIndex: 1
  },
  name: {
    position: 'absolute',
    top: '60%',
    right: 0,
    width: '100%',
    textAlign: 'center',
    color: theme.palette.common.white,
    fontSize: '24px',
    textTransform: 'capitalize',
    zIndex: 2
  },
  info: {
    position: 'absolute',
    padding: theme.spacing(2),
    top: '50%',
    right: 0,
    width: '100%'
  },
  infoBox: {
    color: theme.palette.common.white,
    marginBottom: theme.spacing(2)
  },
  [theme.breakpoints.down('md')]: {
    productInfos: { minHeight: '30vh' },
    background: { height: '100%' },
    name: { top: '80%' },
    info: { display: 'none' }
  }
}));

export default function ProductInfo(props) {
  const classes = useStyles(props);
  const { product } = props;

  if (!product) return <h1>Product Loading...</h1>;

  return (
    <Grid item xs={12} md={12} lg={3}>
      <div className={classes.productInfos}>
        <div
          className={classes.background}
        >
         <img alt="product" src={product.image} /> 
        </div>
        <Typography className={classes.name}>{product.name}</Typography>
        <div className={classes.info}>
          {product.quantity && (
            <div className={classes.infoBox}>
              <Typography variant="subtitle1" color="inherit">
                Quantity
              </Typography>
              <Typography variant="caption" color="inherit">
                {product.quantity}
              </Typography>
            </div>
          )}
          {product.endDate && (
            <div className={classes.infoBox}>
              <Typography variant="subtitle1" color="inherit">
                Off-shelf
              </Typography>
              <Typography variant="caption" color="inherit">
                {product.endDate}
              </Typography>
            </div>
          )}
          {product.price && (
            <div className={classes.infoBox}>
              <Typography variant="subtitle1" color="inherit">
                Price
              </Typography>
              <Typography variant="caption" color="inherit">
                {product.price}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </Grid>
  );
}
