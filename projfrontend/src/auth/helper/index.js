import { API } from "../../backend";

export function signup(user) {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function signin(user) {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function authenticate(data, next) {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
}

export function signout(next) {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((res) => {
        console.log("sign out sucessfull");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function isAuthenticated() {
  // if (typeof window !== "undefined") {
  //   return false;
  // }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
}

export function isAdmin() {
  if (localStorage.getItem("jwt")) {
    let { user } = JSON.parse(localStorage.getItem("jwt"));
    if (user && user.role === 1) {
      return user;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function isUser() {
  if (localStorage.getItem("jwt")) {
    let { user } = JSON.parse(localStorage.getItem("jwt"));
    if (user && user.role === 0) {
      return user;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function userDetails() {
  if (localStorage.getItem("jwt")) {
    let { user } = JSON.parse(localStorage.getItem("jwt"));
    return user;
  } else {
    return {};
  }
}
