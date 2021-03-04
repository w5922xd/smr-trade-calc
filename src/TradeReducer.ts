
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
    case ActionType.UpdateIncrementRelations:
        return updateIncrementRelations(state, action);
    default:
      return state;
  }
}

const updateIncrementRelations = (state: TradeState, action: Action) => {
    let newTradeState = {...state};
    newTradeState.IncrementRelations = action.Payload.isIncremented;
    return newTradeState;
}

const updateRelations = (state: TradeState, action: Action) => {
    let newTradeState = {...state};
    
    newTradeState.Relations = [...action.Payload.Relations];
    console.log(newTradeState);
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

export const updateRelationAction = (relations: Relation[]) => {
    return {
        Type: ActionType.UpdateRelation,
        Payload: {            
            Relations: relations           
        }
      };
}

export const updateTradeAction = (trade: TradeInstance, id: number) => {
    return {
        Type: ActionType.UpdateTradeInstance,
        Payload: {
            Trade: trade, 
            Id: id
        }
      };
}