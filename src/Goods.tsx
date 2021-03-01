import { createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Theme } from "@material-ui/core"
import React from "react"
import { findTradeGood, TradeGoods } from "./State";
import { ActionType, TradeInstance } from "./Types";

interface Props {
    trade: TradeInstance;
    id: number;
    dispatch: Function;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: 180,
    }
  }),
);

export const Goods = ({trade, dispatch, id} : Props) => {
    const classes = useStyles();

    const updateGood = (event: any) => {
        const updatedTrade = {...trade};
        updatedTrade.Good = findTradeGood(event.target.value);
        dispatch({
            Type: ActionType.UpdateTradeInstance, 
            Payload: {
                Trade: updatedTrade,
                Id: id
            }
        });
        
    }
    
    const buildTradeGoodMenuItems = TradeGoods.map(good => {
        return (
            <MenuItem key={good.Name} value={good.Name} color="secondary">{good.Name}</MenuItem>
        )
    });

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="goodSelectorLabel">Trade Good</InputLabel>
            <Select
                labelId="goodSelectorLabel"
                id="goodSelector"
                value={trade.Good.Name}
                onChange={(e) => updateGood(e)}
                label="Trade Good">

                {buildTradeGoodMenuItems}

            </Select>
        </FormControl>
    )
}