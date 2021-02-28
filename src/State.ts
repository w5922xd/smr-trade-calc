import { TradeGood, TradeInstance, TradeMode, TradeSet, TradeState } from "./Types";






export const CreateTradeSet = (id: number): TradeSet => {
    return {
      Id: id,
      Buy: getTradeInstance(TradeMode.Buy), 
      Sell: getTradeInstance(TradeMode.Sell) 
    };
  }



  
export const getTradeInstance = (mode: TradeMode): TradeInstance => { 
    return { 
        Mode: mode,
        Good: FindTradeGood('Luxury Items'),
        //Good: string = 'Luxury Items';
        //GoodPrice: number = 231;
        NumberOfGoods: 250,
        Distance:  5,
        Stock:  4000,
        PortRace:  'Neutral',
        PortRelation: 0  
    }
};

export const FindTradeGood = (goodName: string) => {
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

export const Factions = [
    'Neutral',
    'Alskant',
    'Creonti',
    'Human',
    'Ik\'Thorne',
    'Salvene',
    'Thevian',
    'WQ Human',
    'Nijarin'
];

export const InitialState = (): TradeState => {    
    return {
        TradeSets: [CreateTradeSet(0)]
    // Relations: Factions.map(f => { 
    //     return { Race: f, Value: 0}
    // })
    }
};