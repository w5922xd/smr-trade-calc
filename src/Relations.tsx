import { createStyles, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Theme } from "@material-ui/core"
import React, { useEffect } from "react"
import { findRelation } from "./State";
import { updateRelation } from "./TradeReducer";
import { Relation, TradeInstance } from "./Types";

interface Props {
    trade: TradeInstance;
    id: number;
    relations: Relation[];
    dispatch: Function;
    handleChange: Function;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: 180,
    }
  }),
);


export const Relations = ({trade, id, relations, dispatch, handleChange}: Props) => {
    const classes = useStyles();

    useEffect(() => {
        trade.PortRelation = findRelation(trade.PortRelation.Race, relations);
    }, [relations]);

    const buildPortRaceItems = relations.map(r => {
        return (
            <MenuItem key={r.Race} value={r.Race} color="secondary">{r.Race}</MenuItem>
        );
    })
    

    const updateRace = (event: any) => {
        const updatedTrade = {...trade};
        updatedTrade.PortRelation = findRelation(event.target.value, relations);
        dispatch(updateRelation(updatedTrade, relations, id));
    }

    const updateRelationValue = (event: any) => {
        const updatedTrade = {...trade};
        updatedTrade.PortRelation.Value = parseInt(event.target.value);       
        dispatch(updateRelation(updatedTrade, relations, id));
    }

    return ( 
        <div>
            <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="portRaceLabel">Port Race</InputLabel>
                    <Select
                        labelId="portRaceLabel"
                        id="portRace"
                        value={trade.PortRelation.Race}
                        onChange={(e) => updateRace(e)}
                        label="Port Race">

                    {buildPortRaceItems}

                    </Select>
                </FormControl>
            </Grid>
            

            <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                    <TextField id="PortRelation" label="Port Relations" value={trade.PortRelation.Value} onChange={(e) => updateRelationValue(e)} />
                </FormControl>
            </Grid>
        </div>
    )
}