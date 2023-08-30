const axios = require("axios");
const redux = require("redux");
const reduxThunk = require("redux-thunk").default;

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

const reducer = (state = initialState, action) => {
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

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest());
        axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            const users = response.data.map(user => user.id);
            dispatch(fetchUsersSuccess(users));
        })
        .catch(error => {
            // error.message is the message
            dispatch(fetchUsersFailure(error.message)); 
        })
    }
};

const store = redux.createStore(reducer, redux.applyMiddleware(reduxThunk));
store.subscribe(() => console.log("Hi", store.getState()));
store.dispatch(fetchUsers());