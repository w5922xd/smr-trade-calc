import React, { useContext, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import { Button, FormControl, InputLabel, TextField, Select, MenuItem, FormGroup, Grid, Card, CardContent } from '@material-ui/core';
import { ActionType, TradeInstance } from './Types';
import { Calculate } from './Calculate';
import { Goods } from './Goods';
import { Factions } from './State';
import { addTradeSet } from './TradeReducer';

interface Props{
    trade: TradeInstance;
    dispatch: Function;
    id: number;
 }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: 180,
    },
    root: {
        maxWidth: 350,
        background: '#274472'
    }
  }),
);

export const TradeBase = ({trade, dispatch, id}: Props) => {
    const classes = useStyles();

    const buildPortRaceItems = () => {
        var menuItems = [];
        for(let item in Factions){
            menuItems.push(<MenuItem key={item} value={item} color="secondary">{item}</MenuItem>);
        }
        return menuItems;
    }

    const handleGoodChange = (event: any) => {
    }

    const handleChange = (event: any) => {
        let updatedTrade = {...trade};
        updatedTrade[event.target.id] = event.target.value;

        dispatch(addTradeSet(updatedTrade, id));
    }

    
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
                                onChange={(e) => handleGoodChange(e)}
                                label="Port Race">

                                {() => buildPortRaceItems()}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <TextField id="PortRelation" label="Port Relations" value={trade.PortRelation} onChange={handleChange} />
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
                        <Calculate trade={trade} />
                    </Grid>

                    {/* <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <TextField id="OptimalPrice" label="Optimal Price" value={trade.OptimalPrice} />
                        </FormControl>
                    </Grid> */}
                    
                </Grid>
            </CardContent>
        </Card>
    );
}

//export default Trade;
// export default function ProTip() {
//   const classes = useStyles();
//   return (
//     <Typography className={classes.root} color="textSecondary">
//       <LightBulbIcon className={classes.lightBulb} />
//       Pro tip: See more{' '}
//       <Link href="https://material-ui.com/getting-started/templates/">templates</Link> on the
//       Material-UI documentation.
//     </Typography>
//   );
// }

