import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Grid, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  bannerTitle: {
    fontSize: theme.spacing(1.4),
    textTransform: 'uppercase',
    color: 'rgb(93, 93, 97)',
    marginBottom: theme.spacing(1)
  },
  bannerContent: {
    fontSize: theme.spacing(2),
    textTransform: 'capitalize',
    color: theme.palette.common.white
  },
  [theme.breakpoints.down('sm')]: {
    hideOnSmall: {
      display: 'none'
    }
  }
}));

export default function OrderCheckout(props) {
  const classes = useStyles(props);
  const {
    eureka,
    user,
    price,
    quantity,
    onBook,
    product
  } = props;
const total = quantity * price
  return (
    <Box marginTop={2} bgcolor="rgb(18, 20, 24)">
      
        {!eureka ? (
        <Grid container>
          <Box
          display="flex"
          width={1}
          height={1}
          alignItems="center"
          justifyContent="center">
          <Typography align="center" variant="h2" color="inherit">
            Select a farm to proceed
          </Typography>
        </Box>
      </Grid>
        ) 
      : (
        <Grid container>
          <Grid item xs={8} md={10}>
          <Grid container spacing={3} style={{ padding: 20 }}>
            {user && user.name && (
              <Grid item className={classes.hideOnSmall}>
                <Typography className={classes.bannerTitle}>Farm</Typography>
                <Typography className={classes.bannerContent}>
                  {product.name}
                </Typography>
              </Grid>
            )}
            <Grid item>
              <Typography className={classes.bannerTitle}>Quantity Available</Typography>
              {eureka.quantity > 0 ? (
                <Typography className={classes.bannerContent}>
                  {eureka.quantity} {eureka.metric}
                </Typography>
              ) : (
                <Typography className={classes.bannerContent}>0</Typography>
              )}
            </Grid>
            <Grid item>
              <Typography className={classes.bannerTitle}>Starting Price</Typography>
              <Typography className={classes.bannerContent}>
                #{price} 
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.bannerTitle}>Total Price</Typography>
              <Typography className={classes.bannerContent}>
                #{total}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          md={2}
          style={{
            color: 'rgb(120, 205, 4)',
            background: 'black',
            display: 'flex'
          }}>
          <Button
            color="inherit"
            fullWidth
            onClick={() => onBook()}
            >
            Checkout
          </Button>
        </Grid>
        </Grid>
      )}
    </Box>
    
  );
}
