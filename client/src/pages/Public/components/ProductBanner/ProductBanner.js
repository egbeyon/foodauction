import React, { useState, useEffect} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Rating } from '@material-ui/lab';
import {
  Box,
  Typography,
  Button,
  makeStyles,
  withStyles
} from '@material-ui/core';
import { textTruncate } from '../../../../utils';
import { Link } from 'react-router-dom';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import styles from './styles';
import Counter from './Counter'

const useStyles = makeStyles(styles);

const StyledRating = withStyles({
  iconFilled: {
    color: '#fff'
  },
  iconEmpty: {
    color: '#fff'
  }
})(Rating);

function ProductBanner(props) {
  const [datum, setDatum] = useState(Date)
  const [metric, setMetric] = useState('')
  
  useEffect(() => {
    const { hotbuys, product } = props;

    const hottie = hotbuys.find(hot => hot.productId === product._id)
    if (hottie) {
      setDatum(hottie.startDate) 
      setMetric(hottie.metric)
    }
  })
  console.log(metric)
  const { product, fullDescription } = props

  const classes = useStyles(props);
  if (!product) return null;

  return (
    <div className={classes.productHero}>
      <div className={classes.infoSection}>
      
        <header className={classes.productHeader}>
          {fullDescription && (
            <Box mb={3} display="flex" alignItems="center" flexWrap="wrap">
              {product.typo.split(',').map((product, index) => (
                <Typography
                  key={`${product}-${index}`}
                  className={classes.tag}
                  variant="body1"
                  color="inherit">
                  {product}
                </Typography>
              ))}

              <StyledRating
                value={4}
                readOnly
                size="small"
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />
            </Box>
          )}
          <Typography
            className={classes.productTitle}
            variant="h1"
            color="inherit">
            {product.name}
          </Typography>
          <Typography
            className={classes.descriptionText}
            variant="body1"
            color="inherit">
            {textTruncate(product.description, 450)}
          </Typography>
          <Typography className={classes.director} variant="h4" color="inherit">
            #{product.price}
          </Typography>

          <Typography className={classes.director} variant="h4" color="inherit">
         
            To Be Auctioned In: <Counter hot_date={datum} />
          
          </Typography>
          
          <Typography
            className={classes.duration}
            variant="body1"
            color="inherit">
            {product.quantity} {metric}
          </Typography>
          <Typography className={classes.genre} variant="body1" color="inherit">
            {metric}
          </Typography>
        </header>
        <img alt="product"
                src={product.image} />
      </div>
      
    
      
      
      <div className={classes.productActions}>
        {fullDescription ? (
          <Link to={`booking/${product._id}`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" className={classes.button}>
              Order
              <ArrowRightAlt className={classes.buttonIcon} />
            </Button>
          </Link>
        ) : (
          <Link to={`product/${product._id}`} style={{ textDecoration: 'none' }}>
            <Button className={classnames(classes.button, classes.learnMore)}>
              Learn More
              <ArrowRightAlt className={classes.buttonIcon} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
ProductBanner.propTypes = {
  hotbuys: PropTypes.array.isRequired
};

const mapStateToProps = ({ hotbuyState }) => ({
  hotbuys: hotbuyState.hotbuys
})

export default connect(
  mapStateToProps
)(withStyles(styles)(ProductBanner))
//export default ProductBanner
