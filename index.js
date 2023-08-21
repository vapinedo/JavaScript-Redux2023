const redux = require("redux");
 
const CAKE_ORDER = "CAKE_ORDER";
const CAKE_RESTOCK = "CAKE_RESTOCK";

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

const initialState = {
    numberOfCakes: 10
};

const reducer = (state = initialState, action) => {
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

const store = redux.createStore(reducer);
console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(() => console.log("Updated state", store.getState()));
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

store.dispatch(restockCake(3));

unsubscribe();