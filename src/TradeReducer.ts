
import { CreateTradeSet } from "./State";
import { Action, ActionType, Relation, TradeInstance, TradeMode, TradeSet, TradeState } from "./Types";



export const tradeReducer = (state: TradeState, action: Action): TradeState => {
  switch (action.Type) {
    case ActionType.AddTradeSet:
        return incrementTradeSet(state);
    case ActionType.RemoveTradeSet:
        return decrementTradeSet(state);
    case ActionType.UpdateTradeInstance:
        return updateTradeSet(state, action);
    case ActionType.UpdateRelation:
        return updateRelations(state, action);
    default:
      return state;
  }
}

const updateRelations = (state: TradeState, action: Action) => {
    let relations: Relation[] = [...state.Relations];    
    let sets = [...state.TradeSets];
    let newTradeState = {...state};
    let updatedRelation = {} as Relation;
    let payloadTrade: TradeInstance = {...action.Payload.Trade};

    for(let r in relations){
        if(payloadTrade.Race === relations[r].Race){
            updatedRelation.Race = payloadTrade.PortRelation.Race;
            updatedRelation.Value = payloadTrade.PortRelation.Value;
            relations[r] = updatedRelation;
        }
    }

    let isBuy = action.Payload.Trade.Mode === TradeMode.Buy;
    if(isBuy){        
        sets[action.Payload.Id].Buy = action.Payload.Trade;
    } else {
        sets[action.Payload.Id].Sell = action.Payload.Trade;
    }

    newTradeState.Relations = relations;
    newTradeState.TradeSets = sets;
    return newTradeState;

}

const updateTradeSet = (state: TradeState, action: Action) => {

    let sets: TradeSet[] = [...state.TradeSets];
    let tradeInstance = {...action.Payload.Trade};
    let isBuy = tradeInstance.Mode === TradeMode.Buy;

    if(isBuy){
        sets[action.Payload.Id].Buy = tradeInstance;
    } else {
        sets[action.Payload.Id].Sell = tradeInstance;
    }
    return {...state, TradeSets: sets};

}

export const incrementTradeSet = (state: TradeState) => {
    let sets = [...state.TradeSets];
    sets.push(CreateTradeSet(state.TradeSets.length, state.Relations[0]));
    return {...state, TradeSets: sets};
}

export const decrementTradeSet = (state: TradeState) => {
    let sets = [...state.TradeSets];
    
    if(sets.length <= 1){
        return state;
    }
    
    sets.splice(-1,1);
    return {...state, TradeSets: sets};;
}

export const addTradeSet = (trade: TradeInstance, id: number): Action => {
    return {
      Type: ActionType.UpdateTradeInstance,
      Payload: {
          Trade: trade, 
          Id: id
      }
    };
  }

export const updateRelation = (trade: TradeInstance, relations: Relation[], id: number) => {
    return {
        Type: ActionType.UpdateRelation,
        Payload: {
            Trade: trade, 
            Relations: relations,
            Id: id
        }
      };
}
  