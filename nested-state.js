const redux = require("redux");
const immer = require("immer");

const initialState = {
    name: "Victor",
    address: {
        street: "123 Main st",
        city: "Riohacha",
        state: "La Guajira"
    }
};

const STREET_UPDATED = "STREET_UPDATED";

const streetUpdate = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street
    }
};

const reducer = (state = initialState, action) =>  {
    switch(action.type) {
        case STREET_UPDATED: 
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }
            return immer.produce(state, (draft) => {
                draft.address.street = action.payload
            });
        default: return state;
    }
};

const store = redux.createStore(reducer);
console.log("Initial State", store.getState());
const unsubscribe = store.subscribe(() => console.log("Update state", store.getState()));
store.dispatch(streetUpdate("Avenida La Marina"));
unsubscribe(); 