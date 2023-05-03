const express = require("express")
const app = express()
const cors = require("cors")
const db = require("./db")
const bcrypt = require("bcrypt")

const User = require("./models/user.js")
const Items = require("./models/items.js")

const port = 8080
app.use(express.json())
app.use(express.static("public"))
app.use(cors())
app.use(express.urlencoded({ extended: true })) // middleware to parse the body

app.post("/api/login", async (req, res, next) => {
  //user hand over their email password
  console.log(req.body)
  //   const { email, password } = req.body
  const email = req.body.email
  const password = req.body.password
  // server checks email password

  try {
    let user = await User.findOneByEmail(email)

    let match = await bcrypt.compare(password, user?.password_digest)

    if (!match) throw new Error("invalid email or password")

    res.json(user)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

app.get("/api/items/:id", (req, res, next) => {
  const { id } = req.params
  Items.findOneItem(id).then(item => res.json(item))
})

app.get("/api/items", (req, res, next) => {
  Items.findAll().then(items => res.json(items))
})

app.post("/api/create", (req, res, next) => {
  Items.createItem({
    title: req.body.title,
    describe: req.body.describe,
    image_url: req.body.image,
    price: req.body.price,
    available: req.body.available,
  })
})

app.delete("/api/items/:id", (req, res, next) => {
  const { id } = req.params
  Items.deleteItem(id)
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
