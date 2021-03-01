import { Grid, IconButton, Typography } from "@material-ui/core"
import React from "react"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { ActionType } from "./Types";

interface Props {
    dispatch: Function;
}
export const TradeStateManager = ({dispatch}: Props) => {
    return (
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
  )
}