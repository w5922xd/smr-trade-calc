import { Faction as Faction, Relation, TradeGood, TradeInstance, TradeMode, TradeSet, TradeState } from "./Types";

export const CreateTradeSet = (id: number, initialRelation: Relation): TradeSet => {
    return {
      Id: id,
      Buy: getTradeInstance(TradeMode.Buy, initialRelation), 
      Sell: getTradeInstance(TradeMode.Sell, initialRelation) 
    };
  }

export const getTradeInstance = (mode: TradeMode, initialRelation: Relation): TradeInstance => { 

    return { 
        Mode: mode,
        Good: findTradeGood('Luxury Items'),
        NumberOfGoods: 250,
        Distance:  5,
        Stock:  4000,
        PortRace: 'Neutral'
    }
};

export const findRelation = (raceName: string, relations: Relation[]) => {
    let relation = {} as Relation;
    for(let r in relations){
        if(raceName === relations[r].Race){
            return relations[r];
        }
    }
    
    return relation;
}

export const findTradeGood = (goodName: string) => {
    let tradeGood = {} as TradeGood;
    for(let t in TradeGoods){
        if(TradeGoods[t].Name === goodName){
            tradeGood = TradeGoods[t];
        }
    }
    return tradeGood;
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
        Name: 'Narcotics', 
        Price: 259,
        StockMax: 4000
    }
];

export const initialState = (): TradeState => { 
    const factions = (): Relation[] => {
        let factionList: Relation[] = [];
        for (let f in Faction){
            factionList.push({Race: f, Personal: 0, Political: 0});
        }
        console.log("factionlist", factionList);
        return factionList;
    }

    const relations = factions();
    return {
        TradeSets: [CreateTradeSet(0, relations[0])],
        Relations: relations
    };
};