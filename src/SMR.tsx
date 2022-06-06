import { Relation, TradeGood, TradeInstance, TradeRatio } from "./Types";

export const CalculateBuy = (trade: TradeInstance, relation: Relation) => {
    const tradeRatio = GetTradeRatio(trade, relation);
    return Math.round(0.03 * tradeRatio.priceRatio * Math.pow(trade.Distance, 1.3) * (2 - tradeRatio.stockRatio) * (3 - 2 * tradeRatio.relationRatio));
}

export const CalculateSell = (trade: TradeInstance, relation: Relation) => {
    const tradeRatio = GetTradeRatio(trade, relation);
    return Math.round(0.088 * tradeRatio.priceRatio * Math.pow(trade.Distance, 1.3) * (1 + tradeRatio.stockRatio) * (1.2 + 1.8 * tradeRatio.relationRatio));
}

export const IncreaseRelations = (newRelation: Relation, relations: Relation[], trade: TradeInstance): Relation[] => {
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
    return updatedRelations;
}

export const FindTradeGood = (goodName: string): TradeGood => {
    let tradeGood = {} as TradeGood;
    for(let t in TradeGoods){
        if(TradeGoods[t].Name === goodName){
            tradeGood = TradeGoods[t];
        }
    }
    return tradeGood;
}

export const FindRelation = (raceName: string, relations: Relation[]): Relation => {
    let relation = {} as Relation;
    for(let r in relations){
        if(raceName === relations[r].Race){
            return relations[r];
        }
    }
    
    return relation;
}

export const TradeGoods =  [
    {
        Name: 'Wood', 
        Price: 19,
        StockMax: 6000
    },{
        Name: 'Food', 
        Price: 25,
        StockMax: 6000
    },{
        Name: 'Ore', 
        Price: 42,
        StockMax: 6000
    },{
        Name: 'Precious Metals', 
        Price: 62,
        StockMax: 6000
    },{
        Name: 'Slaves', 
        Price: 89,
        StockMax: 6000
    },{
        Name: 'Textiles', 
        Price: 112,
        StockMax: 5000
    },{
        Name: 'Machinery', 
        Price: 126,
        StockMax: 5000
    },{
        Name: 'Circuitry', 
        Price: 141,
        StockMax: 5000
    },{
        Name: 'Weapons', 
        Price: 168,
        StockMax: 5000
    },{
        Name: 'Luxury Items', 
        Price: 231,
        StockMax: 4000
    },{
        Name: 'Computers', 
        Price: 196,
        StockMax: 4000
    },{
        Name: 'Narcotics', 
        Price: 259,
        StockMax: 4000
    }
] as TradeGood[];

const GetTradeRatio = (trade: TradeInstance, relation: Relation): TradeRatio => {
    const ratios = {} as TradeRatio;
    ratios.priceRatio = trade.Good.Price * trade.NumberOfGoods;
    ratios.stockRatio = trade.Stock / trade.Good.StockMax; 
    let combinedRelations = relation.Personal + relation.Political;
    ratios.relationRatio = combinedRelations / 1000;
    return ratios;
}
