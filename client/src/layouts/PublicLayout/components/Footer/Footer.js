import React from 'react';
import useStyles from './styles';

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <Divider />
      <Typography className={classes.copyright} variant="body1">
        &copy; Segbeyon and George Simos. 2020
      </Typography>
      <Typography variant="caption">
        Crafted with love |{' '}
        <Link href="http://georgesimos.com/" target="_blank" rel="noopener">
          George Simos
        </Link>
      </Typography> */}
    </div>
  );
}
