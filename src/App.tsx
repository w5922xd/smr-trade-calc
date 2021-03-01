import React, { useReducer } from 'react';
import './App.css';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { TradeBase } from './TradeBase';
import {  ActionType, TradeState } from './Types';
import { initialState } from './State';
import { tradeReducer } from './TradeReducer';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

function App() {

  const [tradeState, dispatch] : [TradeState, Function] = useReducer(tradeReducer, initialState());

  const buildTrades = tradeState.TradeSets.map(t => {
    return (
      <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
        <Grid item xs={10} sm={6}>       
          <TradeBase trade={t.Buy} dispatch={dispatch} id={t.Id} relations={tradeState.Relations}  /> 
        </Grid>
        <Grid item xs={10} sm={6}>       
          <TradeBase trade={t.Sell} dispatch={dispatch} id={t.Id} relations={tradeState.Relations} /> 
        </Grid>           
      </Grid>
    )
  });
  
  return (
    <div className="App">
      <Grid container spacing={1} justify="center" alignItems="center" direction="column" >
        <Grid item xs={12}>
          <Typography variant="h3" color="primary" component="h1" gutterBottom>
            SMR Trade Calculator
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1} justify="center" alignItems="center" direction="row" >
            <Grid item>
              <IconButton color="primary" onClick={() => dispatch({ Type: ActionType.AddTradeSet, Payload: null })}>
                <AddIcon />
              </IconButton>         
            </Grid>
            <Grid item>
              <Typography color="primary" variant="h4">Trade Sets</Typography>
            </Grid>
            <Grid item>
              <IconButton color="primary" onClick={() => dispatch({ Type: ActionType.RemoveTradeSet, Payload: null })}>
                <RemoveIcon />
              </IconButton>          
            </Grid>
          </Grid>
        </Grid>

        
        <Grid item xs={12}>
          {buildTrades}
        </Grid>

      </Grid>
    </div>
  );
}

export default App;
