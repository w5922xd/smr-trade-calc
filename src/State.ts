import { FindTradeGood } from "./SMR";
import { Faction, Relation, TradeInstance, TradeMode, TradeSet, TradeState } from "./Types";

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
        Good: FindTradeGood('Luxury Items'),
        NumberOfGoods: 250,
        Distance:  5,
        Stock:  4000,
        PortRace: 'Neutral'
    }
};

export const initialState = (): TradeState => { 
    const factions = (): Relation[] => {
        let factionList: Relation[] = [];
        for (let f in Faction){
            factionList.push({Race: f, Personal: 0, Political: 0});
        }
        console.warn('This shouldnt fire all the time')
        return factionList;
    }

    const storedRelations = localStorage.getItem("relations");
    const relations = !storedRelations ? factions() : JSON.parse(storedRelations);

    const storedTradeSets = localStorage.getItem('tradeSets');
    const tradeSets = !storedTradeSets ? [CreateTradeSet(0, relations[0])] : JSON.parse(storedTradeSets);
    
    return {
        TradeSets: tradeSets,
        Relations: relations,
        IncrementRelations: true
    };
};