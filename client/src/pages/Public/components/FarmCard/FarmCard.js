import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Paper } from '../../../../components';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    paddingBottom: theme.spacing(1),
    cursor: 'pointer'
  },
  imageWrapper: {
    height: '200px',
    width: '150px',
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
  details: { padding: theme.spacing(1) },
  name: {
    fontSize: '24px',
    lineHeight: '21px',
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    textTransform: 'capitalize'
  },
  city: {
    fontSize: '20px',
    lineHeight: '16px',
    height: theme.spacing(4),
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(3)
  },
  eventIcon: {
    color: theme.palette.text.secondary
  },
  eventText: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary
  }
}));

function FarmCard(props) {
  const classes = useStyles(props);
  const { className, farm } = props;
  const farmImage =
    farm && farm.image
      ? farm.image
      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRqrfopKIvRdLmfZdB43deDcSNYXh7zN6qDAA&usqp=CAU';

  const rootClassName = classNames(classes.root, className);
  return (
    <Paper className={rootClassName}>
      <div className={classes.imageWrapper}>
        <img alt="farm" className={classes.image} src={farmImage} />
      </div>
      <div className={classes.details}>
        <Typography className={classes.name} variant="h4">
          {farm.name}
        </Typography>
        <Typography className={classes.city} variant="body1">
          {farm.city}
        </Typography>
      </div>
      <div className={classes.details}>
        <Typography className={classes.city} variant="body2">
          {farm.produce}
        </Typography>
      </div>
      <div className={classes.details}>
        <Typography className={classes.city} variant="body2">
          {farm.sellableQuantity}
        </Typography>
      </div>
      <div className={classes.stats}>
        <Typography className={classes.city} variant="body2">
          {farm.phone_no} 
        </Typography>
      </div>
    </Paper>
  );
}

export default FarmCard;
