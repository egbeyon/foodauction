import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Grid, Typography } from '@material-ui/core';
import ResponsiveProductCard from '../components/ResponsiveProductCard/ResponsiveProductCard';
import { getProducts } from '../../../store/actions/products';

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

function ProductCategoryPage(props) {
  const { products, getProducts } = props;
  const category = props.match.params.category;
  useEffect(() => {
    if (!products.length) {
      getProducts();
    }
  }, [products, getProducts]);

  const classes = useStyles(props);
  return (
    <Grid container spacing={2}>
      {!['nowReady', 'readyLater'].includes(category) ? (
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h2" color="inherit">
            Category Does not exist.
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h2" color="inherit">
              {category}
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            direction="column"
            alignItems="center"
            justify="center"
            spacing={2}>
            {products.map(product => (
              <Grid key={product._id} item className={classes.fullWidth}>
                <ResponsiveProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
}

const mapStateToProps = ({ productState }, ownProps) => ({
  products: productState[ownProps.match.params.category] || []
});

const mapDispatchToProps = { getProducts };

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryPage);
