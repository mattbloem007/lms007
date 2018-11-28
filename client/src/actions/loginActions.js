import { AUTH, LOGOUT, GET_USER } from '../actions/actionTypes';

export const getUser = (json, password) => {
  return dispatch => {
    console.log(json.express);
    let loggedIn = false;

    if (json.express.length > 0) {
      console.log(password, json.express[0].password)
      if (password == json.express[0].password) {
        console.log("true")
        loggedIn = true
      }
    }

    dispatch({
      type: GET_USER,
      payload: loggedIn
    })
    return Promise.resolve()
  }

}

export const logout = () => {
  return dispatch => {
    dispatch({type: LOGOUT, payload: false})
    return Promise.resolve()
  }
}


export const fetchUser = (username, password) => {
  return dispatch => {
    return fetch('/api/user', {
      method: 'POST',
      body:JSON.stringify({username: username, password: password}),
      headers: {"Content-Type": "application/json"}
    })
    .then(res =>  res.json())
    .then(json => {
      console.log(json)
      dispatch(getUser(json, password))
    });
  }
}

export const registerUser = (info) => {
  return dispatch => {
    return fetch('/data/register', {
      method: 'POST',
      body:JSON.stringify(info),
      headers: {"Content-Type": "application/json"}
    })
    .then(res =>  res.json())
    .then(json => {
      console.log(json)
      dispatch({type: AUTH, payload: true})
      return Promise.resolve()
    });
  }
}
