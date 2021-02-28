
import { CreateTradeSet } from "./State";
import { Action, ActionType, TradeInstance, TradeMode, TradeSet, TradeState } from "./Types";



export const tradeReducer = (state: TradeState, action: Action): TradeState => {
  switch (action.Type) {
    case ActionType.AddTradeSet:
        return incrementTradeSet(state);
    case ActionType.RemoveTradeSet:
        return decrementTradeSet(state);
    case ActionType.UpdateTradeInstance:
        return updateTradeSet(state, action);
    case ActionType.UpdateRelation:
      //return state.filter((_task, i) => action.payload.taskId !== i);
      return state;
    default:
      return state;
  }
}

const updateTradeSet = (state: TradeState, action: Action) => {
    let sets: TradeSet[] = [...state.TradeSets];
    let tradeInstance = {...action.Payload.Trade};
    let isBuy = tradeInstance.Mode === TradeMode.Buy;
    debugger;
    if(isBuy){
        sets[action.Payload.Id].Buy = tradeInstance;
    } else {
        sets[action.Payload.Id].Sell = tradeInstance;
    }
    return {...state, TradeSets: sets};

}

export const incrementTradeSet = (state: TradeState) => {
    let sets = [...state.TradeSets];
    sets.push(CreateTradeSet(state.TradeSets.length));
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
  