const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const db = require("./../db")
// const {Pool} = require("pg")
// const db = new Pool({

//     database:"goodfoodhunting"
// })
// const session = require('express-session')
const ensureLoggedIn = require("./../middlewares/ensure_logged_in")
const viewHelpers = require("./../middlewares/view_helpers")

router.get("/users/new", (req, res) => {
  res.render("new_user")
})

router.post("/users", (req, res) => {
  const email = req.body.email
  console.log(email)
  const plainTextPassword = req.body.password

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(plainTextPassword, salt, (err, digestedPassword) => {
      console.log(digestedPassword)
      const sql = `insert into users (email, password_digest) values('${email}','${digestedPassword}');`

      db.query(sql, (err, dbRes) => {
        console.log(err)
        res.redirect("/")
        // db.end()
      })
    })
  })
})

router.get("/users/:id", ensureLoggedIn, (req, res) => {
  console.log(req.params.id)
  const userId = req.params.id

  const sql = `select * from dishes where user_id = ${userId};`

  db.query(sql, (err, dbRes) => {
    if (err) {
      console.log(err)
    } else {
      const dishes = dbRes.rows
      res.render("user_detail", { dishes })
    }
  })
})

router.delete("/users/:user_id", (req, res) => {
  // console.log(req.body.dish_id)

  const sql = `delete from users where id =${req.params.user_id};`

  db.query(sql, (err, dbRes) => {
    // isLoggedIn()=false
    req.session.destroy(() => {
      res.redirect("/login")
    })
  })
})

module.exports = router
// // router.get('/users')//list of user
// // router.post('/users')// create a user
// // router.delete('/users/:id')//delete a user
// // router.put('/users/:id')// update a user
// // router.get('/users/new')// get a new user form
// // router.get('/users/:id/edit')//get existing user form
// // router.get('usets/:id')// get single user
