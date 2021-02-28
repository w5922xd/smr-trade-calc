export interface TradeGood {
    Name: string, 
    Price: number,
    StockMax: number
}

export interface TradeSet {
    Id: number;
    Buy: TradeInstance;
    Sell: TradeInstance;
}



export enum TradeMode {
    Buy, 
    Sell
}

export interface Relation {
    Race: string;
    Value: number;
}

export interface TradeInstance {
    [key: string] : any;
    Mode: TradeMode;
    Good: TradeGood;
    NumberOfGoods: number;
    Distance: number;
    Stock: number;
    PortRace: string;
    PortRelation: number;
}


export interface TradeState {
    TradeSets: TradeSet[];
    //Relations: Relation[];    
}

export interface Action {
    Type: ActionType;
    Payload: any;
}


// export const ActionType = {
//     "AddTradeSet" : "addTradeSet",
//     "RemoveTradeSet" : "removeTradeSet",
//     "UpdateTradeInstance" : "updateTradeInstance",
//     "UpdateRelation" : "updateRelation",
//     "SelectGood"  : "selectGood"
// };

export enum ActionType {
    AddTradeSet,
    RemoveTradeSet,
    UpdateTradeInstance,
    UpdateRelation,
    SelectGood
}




    
