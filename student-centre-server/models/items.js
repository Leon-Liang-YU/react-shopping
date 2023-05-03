const db = require("../db")

function findAll() {
  return db.query("select * from items;").then(res => res.rows)
}

function deleteItem(id) {
  return db.query("delete from items where id = $1;", [id])
}

function findOneItem(id) {
  return db
    .query("select * from items where id = $1;", [id])
    .then(res => res.rows)
}

function createItem(newItem) {
  const sql = `insert into items (title, describe, image_url, price, available) values ($1,$2,$3,$4,$5) returning * ;`
  // notes.push(newNote)
  return db
    .query(sql, [
      newItem.title,
      newItem.describe,
      newItem.image_url,
      newItem.price,
      newItem.available,
    ])
    .then(res => res.rows[0])
}
module.exports = {
  findAll,
  deleteItem,
  findOneItem,
  createItem,
}
