import { call, put, takeEvery } from "redux-saga/effects";
import {
  LOGIN_CHECK,
  putData,
  setUser,
  ADD_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  CHECK_USER,
  LOG_OUT
} from "./login-reducer";

function fetchUserCheck() {
  return fetch('http://localhost:3004/loggedUser')
  .then(res => res.json())
  .catch(err => console.error(err))
}

function fetchGetData(username) {
  return fetch(`http://localhost:3004/users?username=${username}`).then((res) =>
    res.json()
  )
  .catch((err) => console.error(err));
}

function fetchUserSet(user) {
  return fetch('http://localhost:3004/loggedUser', {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

function fetchPutData(user) {
  return fetch(`http://localhost:3004/users/${user.id}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

function* workerUserCheck() {
  const data = yield fetchUserCheck()
  if (data.hasOwnProperty('id')) {
    yield put(setUser(data))
  }
}

function* workerLoginCheck(action) {
  const data = yield call(fetchGetData.bind(null, action.username));

  let result;
  if (data.length !== 0) {
    if (
      data[0].username === action.username &&
      data[0].password === action.password
    ) {
      result = yield fetchUserSet(data[0]);
    }
  } else {
    result = null;
  }

  yield put(putData(result));
}

function* workerAddContact(action) {
  let body = {
    id: Date.now(),
    name: action.name,
    phone: action.phone,
  };
  const user = yield call(fetchGetData.bind(null, action.username));

  user[0].contacts.push(body);

  const updatedUser = yield call(fetchPutData.bind(null, user[0]));

  const result = yield fetchUserSet(updatedUser);

  yield put(setUser(result));
}

function* workerDeleteContact(action) {
  let body = {
    id: action.user.id,
    username: action.user.username,
    password: action.user.password,
    contacts: action.user.contacts.filter((c) => c.id !== action.id),
  };

  const result = yield fetchUserSet(body);

  yield fetchPutData(result);
}

function* workerEditContact(action) {
  let body = {
    ...action.user,
    contacts: action.user.contacts.map(e => {
      if (e.id === action.id) {
        return {
          ...e,
          name: action.name,
          phone: action.phone
        }
      }
      return e
    })
  }
  const data = yield fetchPutData(body)
  
  const result = yield fetchUserSet(data)

  yield put(setUser(result))
}

function* workerLogout() {
  const data = yield fetchUserSet({})

  yield put(setUser(data))
}

export function* watchLoadData() {
  yield takeEvery(CHECK_USER, workerUserCheck)

  yield takeEvery(LOGIN_CHECK, workerLoginCheck);

  yield takeEvery(ADD_CONTACT, workerAddContact);

  yield takeEvery(DELETE_CONTACT, workerDeleteContact);

  yield takeEvery(EDIT_CONTACT , workerEditContact);

  yield takeEvery(LOG_OUT , workerLogout);
}
