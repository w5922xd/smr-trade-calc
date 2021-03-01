import { Button } from "@material-ui/core";
import React from "react";
import { Relations } from "./Relations";
import { updateRelation } from "./TradeReducer";
import { Relation, TradeInstance, TradeMode } from "./Types";

interface Props {
    trade: TradeInstance;
    relations: Relation[];
    dispatch: Function;
    id: number;
}
export const Calculate = ({trade, relations, dispatch, id}: Props) => {

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

        alert(price);
        increaseRelations();
        return price;        
    }

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
    
    return (
        <Button variant="contained" color="primary" onClick={calculatePrice}>Calculate</Button>
    )
}