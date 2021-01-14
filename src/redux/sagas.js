import { call, put, takeEvery } from "redux-saga/effects";
import {
  LOGIN_CHECK,
  putData,
  setUser,
  ADD_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT,
} from "./login-reducer";

function fetchGetData(username) {
  return fetch(`http://localhost:3004/users?username=${username}`).then((res) =>
    res.json()
  );
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

function* workerLoginCheck(action) {
  const data = yield call(fetchGetData.bind(null, action.username));

  let result;
  if (data.length !== 0) {
    if (
      data[0].username === action.username &&
      data[0].password === action.password
    ) {
      result = data;
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
  const result1 = yield call(fetchGetData.bind(null, action.username));

  result1[0].contacts.push(body);

  const result2 = yield call(fetchPutData.bind(null, result1[0]));

  yield put(setUser(result2));
}

function* workerDeleteContact(action) {
  let body = {
    id: action.user.id,
    username: action.user.username,
    password: action.user.password,
    contacts: action.user.contacts.filter((c) => c.id !== action.id),
  };

  yield fetchPutData(body);
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

  yield put(setUser(data))
}

export function* watchLoadData() {
  yield takeEvery(LOGIN_CHECK, workerLoginCheck);

  yield takeEvery(ADD_CONTACT, workerAddContact);

  yield takeEvery(DELETE_CONTACT, workerDeleteContact);

  yield takeEvery(EDIT_CONTACT , workerEditContact);
}
