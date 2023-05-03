import { useState } from "react"
import { login as userApiLogin } from "../utils/users_api.js"
// import { getUser } from "../utils/users_service"
import "./LoginPage.css"
import { Alien } from "phosphor-react"

export default function LoginPage({ onLogin, formData, setFromData }) {
  // const [formData, setFromData] = useState({ email: "", password: "" })

  const [error, setError] = useState("")
  const handleSubmit = e => {
    e.preventDefault()
    if (formData.email && formData.password) {
      console.log(formData)
      userApiLogin(formData)
        .then(res => {
          onLogin(res.email)
          console.log(res)
        })
        .catch(err => console.log(err, "from login"))
    } else {
      setError("invaliddd email or password")
    }
  }

  const handleChange = e => {
    setFromData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }
  return (
    <div className="wrapper">
      <section className="box">
        <div className="container">
          <div className="top-header">
            <h1>Login</h1>
            <p>{error}</p>
          </div>
          <div className="input-field">
            <form onSubmit={handleSubmit} action="">
              {/* <label htmlFor="">email</label> */}
              <input
                onChange={handleChange}
                type="text"
                name="email"
                placeholder="email"
                className="input1"
              />
              {/* <Alien size={25} /> */}
              {/* <label htmlFor="">password</label> */}
              <input
                onChange={handleChange}
                type="password"
                name="password"
                id=""
                placeholder="password"
                className="input2"
              />
              <button className="login">login</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
