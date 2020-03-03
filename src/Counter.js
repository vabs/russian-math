import React, { useEffect, useState, useRef } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

const Counter = props => {
    const [count, setCount]  = useState(10);
    const [timerId, setTimerId]  = useState(null);
    const countRef = useRef(count);
    countRef.current = count;
    const timerIdRef = useRef(timerId);
    timerIdRef.current = timerId;

    function calculate() {
        console.log('COUNT', count);
        initialize();
        //countDown();
    }

    const initialize = () => {
        console.log('before')
        setTimerId(setInterval(() => {
            console.log('timer, ', countRef.current);
            console.log(timerIdRef)
            if(countRef.current === 8) {
                clearInterval(timerIdRef.current);
            } else {
                setCount(count => {
                    console.log('first, ', count)
                    return count -1;
                })
            }
        }, 1000));
    }

    return (
        <div>
             <Grid container justify="center">
                 <Grid item>
                    <Typography variant="h1" component="h2" gutterBottom>
                        {count}
                    </Typography>
                    <Button variant="contained" onClick={calculate}>
                        Count down
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Counter;
