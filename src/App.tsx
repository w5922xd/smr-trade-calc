import React, { useReducer } from 'react';
import './App.css';
import { Button, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { TradeBase } from './TradeBase';
import {  ActionType, TradeInstance, TradeState } from './Types';
import { InitialState } from './State';
import { tradeReducer } from './TradeReducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    
  }),
);

const TradeContext = React.createContext(null);

function App() {

  const [tradeState, dispatch] : [TradeState, Function] = useReducer(tradeReducer, InitialState());


  const buildTrades = tradeState.TradeSets.map(t => {
    return (
      <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
        <Grid item xs={6}>       
          <TradeBase trade={t.Buy} dispatch={dispatch} id={t.Id}  /> 
        </Grid>
        <Grid item xs={6}>       
          <TradeBase trade={t.Sell} dispatch={dispatch} id={t.Id} /> 
        </Grid>           
      </Grid>
    )
  });
  
  return (
    <div className="App">
      <Typography variant="h4" color="primary" component="h1" gutterBottom>
        SMR Trade Calculator
      </Typography>

      <Grid container spacing={1} justify="center" alignItems="center" direction="row" >
        <Grid item>
          <Button variant="contained" color="secondary" onClick={() => dispatch({ Type: ActionType.AddTradeSet, Payload: null })}>Add Trade Set</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={() => dispatch({ Type: ActionType.RemoveTradeSet, Payload: null })}>Remove Trade Set</Button>
        </Grid>
      </Grid>
        
        <br /><br />
        {buildTrades}
    </div>
  );
}

export default App;
