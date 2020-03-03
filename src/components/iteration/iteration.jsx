import React from "react";
import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

import './style.css'

const Iteration = (props) => {
  return (
    <Grid container justify="center" spacing={1} className={`pi ${props.shadow ? 'shadow' : ''}`}>
      <Grid item>
        <TextField disabled variant="outlined" type="text" value={props.left}
          className={`${props.left === 'ANS:' ? 'answer' : 'left'}`} />
      </Grid>
      <Grid item>
        <TextField disabled variant="outlined" type="text" value={props.right}
          className={`${props.left === 'ANS:' ? 'answer' : 'right'}`} />
      </Grid>
  </Grid>
  )
}

export default Iteration;
