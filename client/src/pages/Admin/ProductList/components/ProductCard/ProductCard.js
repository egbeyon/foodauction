import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { AccessTime as AccessTimeIcon } from '@material-ui/icons';
import { Paper } from '../../../../../components';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    paddingBottom: theme.spacing(2)
  },
  imageWrapper: {
    height: '200px',
    margin: '0 auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    'object-fit': 'cover'
  },
  details: { padding: theme.spacing(3) },
  name: {
    fontSize: '18px',
    lineHeight: '21px',
    marginTop: theme.spacing(2),
    textTransform: 'capitalize'
  },
  description: {
    lineHeight: '16px',
    height: theme.spacing(4),
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(3)
  },
  updateIcon: {
    color: theme.palette.text.secondary
  },
  updateText: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary
  }
}));

function ProductCard(props) {
  const classes = useStyles(props);
  const { className, product } = props;

  const rootClassName = classNames(classes.root, className);
  return (
    <Paper className={rootClassName}>
      <div className={classes.imageWrapper}>
        <img alt="product" className={classes.image} src={product.image} />
      </div>
      <div className={classes.details}>
        <Typography className={classes.title} variant="h4">
          {product.name}
        </Typography>
        <Typography className={classes.description} variant="body1">
          {product.description}
        </Typography>
      </div>
      <div className={classes.stats}>
        <AccessTimeIcon className={classes.updateIcon} />
        <Typography className={classes.updateText} variant="body2">
          #{product.price}
        </Typography>
      </div>
      <div className={classes.stats}>
        <AccessTimeIcon className={classes.updateIcon} />
        <Typography className={classes.updateText} variant="body2">
          Available quantity: {product.quantity}
        </Typography>
      </div>
      <div className={classes.stats}>
        <AccessTimeIcon className={classes.updateIcon} />
        <Typography className={classes.updateText} variant="body2">
          End Date: {product.endDate}
        </Typography>
      </div>
    </Paper>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCard;
