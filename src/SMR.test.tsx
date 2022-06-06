import { Relation, TradeInstance } from './Types';
import { CalculateBuy, CalculateSell, FindRelation, FindTradeGood, IncreaseRelations } from './SMR';
import { initialState } from './State';

test("CalculateBuy", () => {
    const result = CalculateBuy(mockTradeInstance, mockRelation);
    expect(result).toBe(28078);
});

test("CalculateSell", () => {
    const result = CalculateSell(mockTradeInstance, mockRelation);
    expect(result).toBe(172960);
});

test("FindTradeGood", () => {
    const result = FindTradeGood("Circuitry");
    expect(result.Price).toBe(141);
});

test("FindRelation", () => {
    const result = FindRelation('Neutral', [{Race: "Test", Personal: 1, Political: 2}, mockRelation]);
    expect(result.Political).toBe(mockRelation.Political);
});

test("IncreaseRelationsFromZero", () => {
    var tradeState = initialState();
    
    IncreaseRelations(mockRelation, tradeState.Relations, mockTradeInstance);

    const relation = FindRelation(mockRelation.Race, tradeState.Relations);
    
    expect(relation.Personal).toBe(9);
});

// Should increment by 1. 
test("IncreaseRelationsFrom500", () => {
    var tradeState = initialState();

    const testRelation = Object.assign({}, mockRelation);
    testRelation.Personal = 500;

    IncreaseRelations(testRelation, tradeState.Relations, mockTradeInstance);

    const relation = FindRelation(testRelation.Race, tradeState.Relations);
    
    expect(relation.Personal).toBe(501);
});

const mockTradeInstance  = {
    "Mode": 0,
    "Good": {
        "Name": "Luxury Items",
        "Price": 231,
        "StockMax": 4000
    },
    "NumberOfGoods": 250,
    "Distance": 5,
    "Stock": 4000,
    "PortRace": "Neutral"
} as TradeInstance; 

const mockRelation = {
    "Race": "Neutral",
    "Personal": 0,
    "Political": 500
} as Relation; 