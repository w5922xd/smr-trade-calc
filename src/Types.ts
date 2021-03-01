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
    PortRelation: Relation;
}


export interface TradeState {
    TradeSets: TradeSet[];
    Relations: Relation[];    
}

export interface Action {
    Type: ActionType;
    Payload: any;
}

export const Faction = { 
    'Neutral': 'Neutral',
    'Alskant': 'Alskant',
    'Creonti': 'Creonti',
    'Human': 'Human',
    'Ik\'Thorne': 'Ik\'Thorne',
    'Salvene': 'Salvene',
    'Thevian': 'Thevian',
    'WQ Human': 'WQ Human',
    'Nijarin': 'Nijarin'
};

export enum ActionType {
    AddTradeSet,
    RemoveTradeSet,
    UpdateTradeInstance,
    UpdateRelation,
    SelectGood
}




    
