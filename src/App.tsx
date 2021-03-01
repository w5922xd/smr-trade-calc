import React, { useReducer } from 'react';
import './App.css';
import { Box, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { TradeBase } from './TradeBase';
import { TradeState } from './Types';
import { initialState } from './State';
import { tradeReducer } from './TradeReducer';
import { TradeStateManager } from './TradeStateManager';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      padding: 8,      
    }
  }),
);

function App() {
  const classes = useStyles();
  const [tradeState, dispatch] : [TradeState, Function] = useReducer(tradeReducer, initialState());

  const buildTrades = tradeState.TradeSets.map(t => {
    return (
      <Box borderColor="primary.main" className={classes.box} m={2}>
      <Grid container direction="row" justify="center" alignItems="center" spacing={4}>
        <Grid item xs={10} sm={6}>       
          <TradeBase trade={t.Buy} dispatch={dispatch} id={t.Id} relations={tradeState.Relations}  /> 
        </Grid>
        <Grid item xs={10} sm={6}>       
          <TradeBase trade={t.Sell} dispatch={dispatch} id={t.Id} relations={tradeState.Relations} /> 
        </Grid>           
      </Grid>
      </Box>
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
           <TradeStateManager dispatch={dispatch} />
        </Grid>
        
        <Grid item>
          {buildTrades}
        </Grid>

      </Grid>
    </div>
  );
}

export default App;
