import {
  GET_USERS,
  GET_BY_NAME
} from "../action";

let initialState = {
  allUsers: [],
  Userscopy: [],
  post: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
      case GET_USERS:
          return {
              ...state,
              allUsers: action.payload,
                  Userscopy: action.payload,
          };
      case GET_BY_NAME:
          return {
              ...state,
              allUsers: action.payload,
          };
      default:
          return state;
  }
}

export default rootReducer;