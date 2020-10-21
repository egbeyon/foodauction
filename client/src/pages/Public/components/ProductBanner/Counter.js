import React, { useState, useEffect} from 'react'
import {Grid, Typography} from '@material-ui/core'

export default function Counter({hot_date}) {
    const [ year, setYear ] = useState(Date)
  const Countdown = () => {
    let y = new Date().getFullYear()
    let year = hot_date ? hot_date : `12/31/${y}` 
  
    const difference = +new Date(`${year}`) - +new Date()
    let timeLeft = {}
    if (difference > 0 ) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor(difference / (1000 / 60 ) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }
    return timeLeft;
  }

  const [timeLeft, setTimeLeft] = useState(Countdown())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(Countdown());
      setYear(new Date().getFullYear())
    }, 1000)
    // clear timeout if the component is unmounted
    return () => clearTimeout(timer)
  })

  const timerComponent = []
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
        return
    }
    timerComponent.push(
        <span>
            {timeLeft[interval]} {interval}{" "}
        </span>
    )
  }) 
    return (
        <div>
            <Grid item lg={9} xs={12} md={12}>
                <Typography>
                    {timerComponent.length ? timerComponent 
                     : <span>Begins Now!</span>}
                </Typography>
      </Grid>
        </div>
    )
}
