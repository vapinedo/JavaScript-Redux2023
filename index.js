const redux = require("redux");
const reduxLogger = require("redux-logger");
 
const CAKE_ORDER = "CAKE_ORDER";
const CAKE_RESTOCK = "CAKE_RESTOCK";
const ICECREAM_ORDER = "ICECREAM_ORDER";
const ICECREAM_RESTOCK = "ICECREAM_RESTOCK";

const orderCake = () => {
    return {
        type: CAKE_ORDER,
        payload: 1
    }
};
const restockCake = (quantity = 1) => {
    return {
        type: CAKE_RESTOCK,
        payload: quantity
    }
};
const orderIceCream = () => {
    return {
        type: ICECREAM_ORDER,
        payload: 1
    }
};
const restockIceCream = (quantity = 1) => {
    return {
        type: ICECREAM_RESTOCK,
        payload: quantity
    }
};

// const initialState = {
//     numberOfCakes: 10,
//     numberOfIceCreams: 20
// };

const initialCakeState = {
    numberOfCakes: 10
};
const initialIcreCreamState = {
    numberOfIceCreams: 20
};

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case CAKE_ORDER:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1
            }
        case CAKE_RESTOCK:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes + action.payload
            }
        default: return state;
    }
};
const iceCreamReducer = (state = initialIcreCreamState, action) => {
    switch(action.type) {
        case ICECREAM_ORDER:
            return {
                ...state,
                numberOfIceCreams: state.numberOfIceCreams - 1
            }
        case ICECREAM_RESTOCK:
            return {
                ...state,
                numberOfIceCreams: state.numberOfIceCreams + action.payload
            }
        default: return state;
    }
};

const rootReducer = redux.combineReducers({ 
    cake: cakeReducer, 
    iceCream: iceCreamReducer 
});

const store = redux.createStore(
    rootReducer, 
    redux.applyMiddleware(reduxLogger.createLogger())
);

console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(() => { });
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

const actionCreators = {
    orderCake,
    restockCake,
    orderIceCream,
    restockIceCream
};
const actions = redux.bindActionCreators(actionCreators, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);

console.log("-----");

actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2);

unsubscribe();