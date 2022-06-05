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
    Personal: number;
    Political: number;
}

export interface TradeInstance {
    [key: string] : any;
    Mode: TradeMode;
    Good: TradeGood;
    NumberOfGoods: number;
    Distance: number;
    Stock: number;
    PortRace: string;
}


export interface TradeState {
    TradeSets: TradeSet[];
    Relations: Relation[];
    IncrementRelations: boolean; 
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
    SelectGood,
    UpdateIncrementRelations
}

export interface TradeRatio {
    priceRatio: number;
    stockRatio: number;
    relationRatio: number;
}




    
