import axios from "axios"
// import { getToken } from "./users_service"

export function saveItem(item) {
  return fetch(`/api/notes/${item.id}`, {
    method: "put",
  }).then(res => res.json())
}

export function deleteItem(id) {
  // return fetch(`/api/notes/${id}`, {
  //   method: "delete",
  // })
  return axios.delete(`/api/items/${id}`).then(res => console.log(res.data))
}

export function fetchItems() {
  return axios.get("/api/items", {}).then(res => res.data)
}

export function fetchOneItem(id) {
  return axios.get(`/api/items/${id}`).then(res => {
    console.log(res.data)
    return res.data
  })
}

export function createItem({ title, describe, image, price, available }) {
  return axios
    .post("/api/create", {
      title,
      describe,
      image,
      price,
      available,
    })
    .then(res => res.data)
}
