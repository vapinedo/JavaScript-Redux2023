const redux = require("redux");

const initialState = {
    loading: false,
    users: [],
    error: ""
};

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEDED = "FETCH_USERS_SUCCEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED
    }
};
const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCEDED,
        payload: users
    }
};
const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
};

const reducer = (state = initialState, action) {
    switch(action.type) {
        case FETCH_USERS_REQUESTED: 
            return {
                ...state,
                loading: true,
            }
        case FETCH_USERS_SUCCEDED:
            return {
                loading: false,
                error: "",
                users: action.payload
            }
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        default: return state;
    }
}

const store = redux.createStore(reducer);

