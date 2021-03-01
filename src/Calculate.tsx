import { Box, Button, createStyles, Dialog, DialogTitle, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Relations } from "./Relations";
import { updateRelation } from "./TradeReducer";
import { Relation, TradeInstance, TradeMode } from "./Types";

interface Props {
    trade: TradeInstance;
    relations: Relation[];
    dispatch: Function;
    id: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {        
       
    },
    paper: {
        backgroundColor: "#274472",
        boxShadow: "none",
        overflow: "hidden",
        minWidth: 200
      }
  }),
);


export const Calculate = ({trade, relations, dispatch, id}: Props) => {
    const classes = useStyles();
    const [open, setOpen]: [boolean, Function] = useState(false);
    const [price, setPrice]: [number, Function] = useState(0);

    const calculatePrice = () => {
        let isBuy = trade.Mode === TradeMode.Buy;
        let rate = isBuy ? 0.03 : 0.088;
        let priceRatio = trade.Good.Price * trade.NumberOfGoods;
        let stockRatio = trade.Stock / trade.Good.StockMax;
        let relationRatio = trade.PortRelation.Value / 1000;
        let price; 

        if(isBuy){
            price = Math.round(rate * priceRatio * Math.pow(trade.Distance, 1.3) * (2 - stockRatio) * (3 - 2 * relationRatio));
        } else {
            price = Math.round(rate * priceRatio * Math.pow(trade.Distance, 1.3) * (1 + stockRatio) * (1.2 + 1.8 * relationRatio));
        }

        setPrice(price)
        setOpen(true)
        increaseRelations();        
        return price;        
    }

    const handleClose = () => {
        setOpen(!open);
      };

    const increaseRelations = () => {
        let relationValue: number = trade.PortRelation.Value;       
        const updatedTrade = {...trade};
      
        if(relationValue >= 500){
            relationValue++;
        } else {              
            relationValue += Math.ceil(Math.min(trade.NumberOfGoods, 300) / 30);           
        }
                
        updatedTrade.PortRelation.Value = relationValue;

        dispatch(updateRelation(updatedTrade, relations, id));
        
    }

    const copyPrice = () =>  {
        navigator.clipboard.writeText(price.toString());
        setOpen(false);        
    }
    
    return (
        <div>
        <Button variant="contained" color="primary" onClick={calculatePrice}>Calculate</Button>
       
        <Dialog onClose={handleClose} open={open}
                PaperProps ={{ 
                    classes: {  
                        root: classes.paper
                    }
                }}>
           <Grid container spacing={1} justify="center" alignItems="center" direction="column">
                <Grid item>
                <Typography variant="h5">Optimal Price</Typography>                   
                </Grid>
                <Grid item>
                    <Typography>
                            Price: {price}
                    </Typography>
                </Grid>
                <Grid item>
                    <Box pb={2}>
                        <Button variant="contained" color="primary" onClick={() => copyPrice()}>Copy to Clipboard</Button> 
                    </Box>
                </Grid>
            </Grid>
        </Dialog>
        
        </div>
    )
}