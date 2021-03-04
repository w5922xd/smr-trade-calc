import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormControl, TextField, Grid, Card, CardContent, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Relation, TradeInstance } from './Types';
import { Calculate } from './Calculate';
import { Goods } from './Goods';
import { addTradeSet, updateRelationAction, updateTradeAction } from './TradeReducer';

interface Props{
    trade: TradeInstance;
    dispatch: Function;
    id: number;
    relations: Relation[];
   
 }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: 180
    },
    root: {
        maxWidth: 350,
        background: '#274472'
    }
  }),
);

export const TradeBase = ({trade, dispatch, id, relations}: Props) => {
    const classes = useStyles();

    const handleChange = (event: any) => {
        let updatedTrade = {...trade};
        updatedTrade[event.target.id] = event.target.value;

        dispatch(addTradeSet(updatedTrade, id));
    }

    const updateRace = (event: any) => {
        const updatedTrade = {...trade};
        updatedTrade.PortRace = event.target.value;
        dispatch(updateTradeAction(updatedTrade, id));
    }

    const buildPortRaceItems = relations.map(r => {
        return (
            <MenuItem key={r.Race} value={r.Race} color="secondary">{r.Race}</MenuItem>
        );
    })

    
    return (
        <Card className={classes.root} color="#61dafb">
            <CardContent >
                <Grid container spacing={0}>             
                    <Grid item xs={12}>
                        <Goods trade={trade} dispatch={dispatch} id={id} />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="portRaceLabel">Port Race</InputLabel>
                            <Select
                                labelId="portRaceLabel"
                                id="portRace"                               
                                value={trade.PortRace}
                                onChange={(e) => updateRace(e)}
                                label="Port Race">

                                {buildPortRaceItems}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <TextField id="NumberOfGoods" 
                                       label="Number of Goods" 
                                       value={trade.NumberOfGoods}
                                       onChange={handleChange} />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <TextField id="Distance" label="Distance" value={trade.Distance} onChange={handleChange} />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <TextField id="Stock" label="Stock Amount" value={trade.Stock} onChange={handleChange} />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Calculate trade={trade} relations={relations} dispatch={dispatch} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
