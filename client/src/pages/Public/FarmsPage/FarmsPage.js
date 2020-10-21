import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, Grid, Typography, Container } from '@material-ui/core';
import { getFarms } from '../../../store/actions/farms';
import FarmCard from '../components/FarmCard/FarmCard';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(3)
  }
}));

function FarmsPage(props) {
  const classes = useStyles(props);
  const { farms, getFarms } = props;
  useEffect(() => {
    if (!farms.length) getFarms();
  }, [farms, getFarms]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h2" color="inherit">
            Farms
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justify="flex-start"
          spacing={2}>
          {farms.map(farm => (
            <Grid key={farm._id} item xs={12} md={4} lg={3}>
              <FarmCard farm={farm} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = ({ farmState }) => ({
  farms: farmState.farms
});

const mapDispatchToProps = { getFarms };

export default connect(mapStateToProps, mapDispatchToProps)(FarmsPage);
