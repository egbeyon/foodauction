import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import FarmCard from '../../../components/FarmCard/FarmCard'
import { Grid, Box, TextField, MenuItem, Typography } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

export default function OrderForm(props) {
  const [price, setPrice] = useState(0)
  const [date, setDate] = useState(Date)
  const [time, setTime] = useState('')
  const {
    farms,
    hotbuys,
    selectedFarm,
    onChangeFarm,
    quantity,
    onChangeQuant,
    shaDate,
    shaTime,
    shaPrice,
  } = props; 
   
  useEffect(() => {
    const { hotbuys,  product, selectedFarm } = props
    
    hotbuys.find(
      hotbuy => {
        if (hotbuy.farmId === selectedFarm) {
            setDate(hotbuy.endDate)
            setPrice(product.price)
            setTime(hotbuy.startAt)
      } else return }
    );   
  })

  const hotbuy = hotbuys.find(
    hotbuy => hotbuy.farmId === selectedFarm
  );

  const touch = () => {
    shaPrice(price)
    shaDate(date)
    shaTime(time)
  }
  
  console.log(price, date)
  if (!farms.length)
    return (
      <Box
        display="flex"
        width={1}
        height={1}
        alignItems="center"
        justifyContent="center">
        <Typography align="center" variant="h2" color="inherit">
          No Farm is curently Offering this product, kindly check back later.
        </Typography>
      </Box>
    );

  return (
    <div>     
    <Grid container spacing={3}>
      <Grid item xs>
        <TextField
          fullWidth
          select
          value={selectedFarm}
          label="Select Farm"
          variant="outlined"
          onChange={onChangeFarm}>
          {farms.map(farm => (
            <MenuItem key={farm._id} value={farm._id} >
              {farm.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      {hotbuy && (
        <Grid item xs>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              inputvariant="outlined"
              margin="none"
              fullWidth
              name="date"
              label="Start Date"
              value={date}
              onChange={shaDate}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      )}
      {hotbuy && (
        <Grid item xs>
          <TextField
              inputvariant="outlined"
              margin="none"
              fullWidth
              name="quantity"
              label={`How many ${!hotbuy.metric ? 'quantity' : hotbuy.metric} do you want?`} 
              type="Number"
              value={quantity}
              variant="outlined"
              onChange={onChangeQuant}
              onMouseEnter={() => touch()}
              />
        </Grid>
      )}
      </Grid>
      <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography  
          variant="h2" color="inherit">
            Farms
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justify="center"
          spacing={2}>
          {farms.map(farm => (
          <Grid key={farm._id} item xs={12} md={4} lg={3}>
              <FarmCard farm={farm} />
          </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>

    </div>
     );
}
