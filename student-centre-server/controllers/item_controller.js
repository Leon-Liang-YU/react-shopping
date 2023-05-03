const express = require("express")
const router = express.Router()
// const client = require("pg")
// const app = express()
// const methodOverride = require('./middlewares/override_method')
// const port =8080
const db = require("./../db")

const ensureLoggedIn = require("./../middlewares/ensure_logged_in")

router.get("/", (req, res) => {
  // console.log(req.session)

  const sql = "select * from dishes;"

  db.query(sql, (err, dbRes) => {
    // console.log(dbRes.rows)
    const dishes = dbRes.rows
    // res.render("home", {dishes: dishes,email: req.session.email})
    res.render("home", { dishes: dishes })
  })
})

router.get("/dishes/new", (req, res) => {
  res.render("new_dish")
})

router.get("/dishes/:id", (req, res) => {
  // console.log(req.params.id)
  //pg gona sanitise $1 $2 ...
  const sql = `select * from dishes where id = $1;`
  //{req.params.id} sanatise the sql string
  db.query(sql, [req.params.id], (err, dbRes) => {
    if (err) {
      console.log(err)
    } else {
      const dish = dbRes.rows[0]
      res.render("dishesDetail", { dish })
    }
  })
})

router.post("/dishes", (req, res) => {
  if (!req.session.userId) {
    res.redirect("login")
    return
  }
  // console.log(req.body)
  const sql = "insert into dishes (title, image_url,user_id) values ($1,$2,$3);"

  db.query(
    sql,
    [req.body.title, req.body.image_url, req.session.userId],
    (err, dbRes) => {
      res.redirect("/")
    }
  )
})

router.put("/dishes/:dish_id", ensureLoggedIn, (req, res) => {
  const sql = `update dishes set title = $1, image_url = $2 where id = $3;`

  db.query(
    sql,
    [req.body.title, req.body.image_url, req.params.dish_id],
    (err, dbRes) => {
      res.redirect(`/dishes/${req.params.dish_id}`)
    }
  )
})

router.get("/dishes/:dish_id/edit", ensureLoggedIn, (req, res) => {
  //fetch the record for this dish
  //so i can use it in the form in the template

  const sql = `select * from dishes where id = $1 ;`

  db.query(sql, [req.params.dish_id], (err, dbRes) => {
    if (err) {
      console.log(err)
    } else {
      const dish = dbRes.rows[0]
      res.render("edit_dish", { dish: dish })
    }
  })
})

router.delete("/dishes/:dish_id", ensureLoggedIn, (req, res) => {
  // console.log(req.body.dish_id)
  const sql = `delete from dishes where id =$1;`

  db.query(sql, [req.params.dish_id], (err, dbRes) => {
    res.redirect("/")
  })
})
// app.get("update_dish",(req, res))

// app.get("/delete_dish/:dish_id", (req, res)=>{
//     console.log(req.params.dish_id)

//     const sql = `delete from dishes where id = ${req.params.dish_id};`;

//     db.query(sql, (err, dbRes) => {

//         res.redirect("/")
//     })

// })

// app.get("/delete_dish/:dish_id", (req, res)=>{
//     console.log(req.query.dish_id)

//     const sql = `delete from dishes where id = ${req.query.dish_id};`;

//     db.query(sql, (err, dbRes) => {

//         res.redirect("/")
//     })

// })

module.exports = router
