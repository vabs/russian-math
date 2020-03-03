import React, { useEffect, useState, useRef } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

const ListCounter = props => {
    const [count, setCount]  = useState([10]);
    const [timerId, setTimerId]  = useState(null);
    const countRef = useRef(count);
    countRef.current = count;
    const timerIdRef = useRef(timerId);
    timerIdRef.current = timerId;

    function calculate() {
        // console.log('COUNT', count);
        initialize();
    }

    const initialize = () => {
        console.log('before')
        setTimerId(setInterval(() => {
            let temp = countRef.current;
            console.log('timer, ', countRef.current);
            if(temp[temp.length - 1] === 8) {
                clearInterval(timerIdRef.current);
                console.log('STOP!');
            } else {
                setCount(() => {
                    console.log('first, ')
                    // return count -1;
                    let temp = countRef.current.slice();
                    temp.push(temp[temp.length - 1] - 1)
                    return temp;
                })
            }
        }, 1000));
    }

    return (
        <div>
             <Grid container justify="center">
                 <Grid item>
                    
                        {countRef.current.map((v1, i) => {
                            console.log('RENDER');
                            return (
                            <Typography key={i} variant="h1" component="h2" gutterBottom>
                                {v1}
                            </Typography>
                            )
                        })}
                    
                    <Button variant="contained" onClick={calculate}>
                        Count down
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default ListCounter;
