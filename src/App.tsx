import { useReducer } from 'react';
import './App.css';
import {  Grid, Typography } from '@material-ui/core';
import { TradeBase } from './TradeBase';
import { TradeState } from './Types';
import { initialState } from './State';
import { tradeReducer } from './TradeReducer';
import { TradeStateManager } from './TradeStateManager';
import { Relations } from './Relations';

function App() {
  const [tradeState, dispatch] : [TradeState, Function] = useReducer(tradeReducer, initialState());
  
  return (
    <div className="App">
      <Grid container spacing={1}  direction="column" >
        <Grid item xs={12}>
          <Typography variant="h3" color="primary" component="h1" gutterBottom>
            SMR Trade Calculator
          </Typography>
        </Grid>

        <Grid item xs={12}>
           <TradeStateManager dispatch={dispatch} />
        </Grid>
        
        <Grid item xs={12}>
          <Grid container justify="space-evenly" direction="row">
            <Grid item>            
              <Relations dispatch={dispatch} tradeState={tradeState} />              
            </Grid>
            <Grid item xs={8}>
            {tradeState.TradeSets.map((t) => (
              <Grid container justify="center" spacing={2} direction="row">
                <Grid item xs={4}>                   
                    <TradeBase trade={t.Buy} dispatch={dispatch} id={t.Id} relations={tradeState.Relations}  />                    
                </Grid>
                <Grid item xs={6}>                   
                  <TradeBase trade={t.Sell} dispatch={dispatch} id={t.Id} relations={tradeState.Relations} />                 
                </Grid>                
              </Grid>
            ))}
           </Grid>
            <Grid item></Grid>
            
            
          </Grid>      
   
          </Grid>
      </Grid>
    </div>
  );
}

export default App;
