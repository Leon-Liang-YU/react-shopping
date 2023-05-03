import React from "react"
import { Link } from "react-router-dom"
import { ShoppingCart } from "phosphor-react"
import "./navbar.css"

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/api/create">post</Link>
        <Link to="/">shop</Link>
        <Link to="/cart">
          <ShoppingCart size={60} />
        </Link>
      </div>
    </div>
  )
}
