import React, { useState, useRef } from "react";
import shortid from "shortid";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

import "./App.css";
import Iteration from "./components/iteration/iteration";
import Logger from "./components/logger/index";

const App = () => {
  const [iterations, setIteration] = useState([]);
  const [logs, setLogs] = useState([]);
  const [left, setLeftValue] = useState(9);
  const [right, setRightValue] = useState(13);
  const [timeoutId, setTimeoutId] = useState(null);

  const leftRef = useRef(left);
  leftRef.current = left;
  const rightRef = useRef(right);
  rightRef.current = right;
  const timeoutRef = useRef(timeoutId);
  timeoutRef.current = timeoutId;
  const iterationsRef = useRef(iterations);
  iterationsRef.current = iterations;
  const logsRef = useRef(logs);
  logsRef.current = logs;

  
  let currentValues = {};
  let tempIterations = [];
  let tempLogs = [];

  function reset() {
    setIteration([]);
    if(timeoutId != null || timeoutRef.current != null) {
      clearTimeout(timeoutRef.current);
      setTimeoutId(null);
    }
    setLogs([]);
  }
  
  function _handleTextFieldChange(e) {
    reset();
    e.target.id === "left"
      ? setLeftValue(e.target.value)
      : setRightValue(e.target.value);
  }

  function calculate() {
    reset()
    setTimeoutId(setInterval(() => {
      if(iterationsRef.current.length === 0) {
        tempIterations.push({
          left: leftRef.current, 
          right: rightRef.current
        });
        setIteration(tempIterations);
        addLog("Start Calculating!");
        addLog([
          <strong key={shortid.generate()}>Half</strong>, 
          " the left value. ",
          <strong key={shortid.generate()}>Double</strong>,
          " the right value."]);
      } else {
        tempIterations = iterationsRef.current.slice();
        currentValues = tempIterations[tempIterations.length - 1];
        if(Number.parseInt(currentValues.left / 2) === 0) {
          clearTimeout(timeoutRef.current);
          console.log('DONE!', iterationsRef)
          disableEvenIterations();
        } else {
          tempIterations.push({
            left: Number.parseInt(currentValues.left / 2),
            right: currentValues.right * 2
          });
          setIteration(tempIterations);
        }
      }
    }, 1000));
  }

  function disableEvenIterations() {
    tempIterations = iterationsRef.current.slice();
    tempIterations.map(iteration => {
      if(iteration.left % 2 === 0) {
        iteration.shadow = true;
      }
    });
    setIteration(tempIterations);
    addLog([<strong key={shortid.generate()}>Remove</strong>, " all left even valued rows"]);
    setTimeout(() =>{
      addLog([<strong key={shortid.generate()}>Add</strong>, " all the remaining right columns."])
      setFinalAnswer();
    }, 1000);
    setTimeout(() =>{
      addLog([
        'For more explanation see: ', 
        <a key={shortid.generate()} href="https://www.youtube.com/watch?v=HJ_PP5rqLg0">
        https://www.youtube.com/watch?v=HJ_PP5rqLg0</a>
      ])
    }, 2500);
  }

  function setFinalAnswer() {
    tempIterations = iterationsRef.current.slice();
    tempIterations.push({
      left: 'ANS:',
      right: left * right
    });
    setIteration(tempIterations);
  }

  function addLog(log) {
    tempLogs = logsRef.current.slice()
    tempLogs.push(log);
    setLogs(tempLogs);
  }

  return (
    <div className="App">
      <Grid container justify="center">
        <Grid item xs={12}>
          <Typography variant="h1" component="h2" gutterBottom>
            Russian Maths
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
            <Grid container justify="center" spacing={2}>
              <Grid item>
                <TextField
                  id="left"
                  variant="outlined"
                  type="number"
                  value={left}
                  onChange={_handleTextFieldChange}
                />
              </Grid>
              <Grid item className="mt">
                X
              </Grid>
              <Grid item>
                <TextField
                  id="right"
                  variant="outlined"
                  type="number"
                  value={right}
                  onChange={_handleTextFieldChange}
                />
              </Grid>
            </Grid>
            <Grid container justify="center" className="pi">
              <Grid item>
                <Button variant="contained" onClick={calculate}>
                  calculate
                </Button>
              </Grid>
            </Grid>
              {iterationsRef.current.map((iteration, i) => 
                  <Iteration key={i} {...iteration} />
              )}
        </Grid>
        <Grid item xs={5}>
          {logsRef.current.map((log, i) =>
            <Logger key={i} log={log}></Logger>
          )}
        </Grid>
      </Grid>

      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
};

export default App;
