import axios from "axios"

export function login(data) {
  return axios
    .post("http://localhost:8080/api/login", data)
    .then(res => res.data)
}
