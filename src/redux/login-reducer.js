export const LOG_IN = "LOG_IN";
export const CHECK_USER = "CHECK_USER";
export const LOGIN_CHECK = "LOGIN_CHECK";
export const ADD_CONTACT = "ADD_CONTACT";
export const SET_USER = "SET_USER";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const EDIT_CONTACT = "EDIT_CONTACT";
const SEARCH_CONTACT = "SEARCH_CONTACT";
export const LOG_OUT = "LOG_OUT";

const initialState = {
  loggedPerson: {},
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN: {
      if (action.data !== null) {
        alert(`Welcome, ${action.data.username}!`);
        return {
          ...state,
          loggedPerson: action.data,
        };
      } else {
        alert("Wrong username or password, try again");
        return state;
      }
    }
    case SET_USER: {
      return {
        ...state,
        loggedPerson: action.data,
      };
    }
    default:
      return state;
  }
}

export const setUser = (data) => ({
  type: SET_USER,
  data,
});

export const checkUser = () => ({
  type: CHECK_USER
})

export const deleteContactCreator = (id, user) => ({
  type: DELETE_CONTACT,
  id,
  user,
});

export const editContactCreator = (id, name, phone, user) => {
  return {
  type: EDIT_CONTACT,
  id,
  name,
  phone,
  user,}
};

export const putData = (data) => ({ type: LOG_IN, data });

export const loginCheckCreator = (username, password) => {
  return {
    type: LOGIN_CHECK,
    username,
    password,
  };
};

export const addContactCreator = (name, phone, username) => ({
  type: ADD_CONTACT,
  name,
  phone,
  username,
});

export const searchContactCreator = (value) => ({
  type: SEARCH_CONTACT,
  value
})

export const logoutCreator = () => ({
  type: LOG_OUT,
});

export default loginReducer;
