import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  }
}));

function Checkin(props) {
  const reserveId = props.match.params.reserveId;
  const [reserve, setReserve] = useState(null);

  useEffect(() => {
    checkinReserves(reserveId);
  }, [reserveId]);

  const checkinReserves = async id => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/reserves/checkin/' + id;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const reserve = await response.json();
      if (response.ok) {
        setReserve(reserve);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const classes = useStyles(props);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography className={classes.title} variant="h2" color="inherit">
          Check In
        </Typography>
        {reserve && reserve.checkin ? (
          <Typography variant="body1" color="primary" align="center">
            Check in for user: {reserve.username} was successful.
          </Typography>
        ) : (
          <Typography variant="body1" color="error" align="center">
            Something went wrong...
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default Checkin;
