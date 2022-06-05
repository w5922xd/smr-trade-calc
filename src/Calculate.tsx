import { Box, Button, createStyles, Dialog, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import { useState } from "react";
import { CalculateBuy, CalculateSell, FindRelation } from "./SMR";
import { updateRelationAction } from "./TradeReducer";
import { Relation, TradeInstance, TradeMode } from "./Types";

interface Props {
    trade: TradeInstance;
    dispatch: Function;
    relations: Relation[];
    incrementRelations?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
        backgroundColor: "#274472",
        boxShadow: "none",
        overflow: "hidden",
        minWidth: 200
      }
  }),
);


export const Calculate = ({trade, dispatch, relations}: Props) => {
    const classes = useStyles();
    const [open, setOpen]: [boolean, Function] = useState(false);
    const [price, setPrice]: [number, Function] = useState(0);        

    const calculatePrice = () => {        
        var relation = FindRelation(trade.PortRace, relations);
        let price = trade.Mode === TradeMode.Buy ? CalculateBuy(trade, relation) : CalculateSell(trade, relation);    
        setPrice(price)
        setOpen(true)
        increaseRelations(relation);        
        return price;        
    }

    const handleClose = () => {
        setOpen(!open);
      };

    const increaseRelations = (newRelation: Relation) => {
        let relationValue: number = newRelation.Personal;       
        const updatedRelations = [...relations];
      
        if(relationValue >= 500){
            relationValue++;
        } else {              
            relationValue += Math.ceil(Math.min(trade.NumberOfGoods, 300) / 30);           
        }

        for(let r in updatedRelations){
            if(updatedRelations[r].Race === newRelation.Race){
                updatedRelations[r].Personal = relationValue;
            }
        }
                
        dispatch(updateRelationAction(updatedRelations));
        
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