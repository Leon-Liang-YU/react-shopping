import React, { useContext } from "react"
import { ShopContext } from "../../components/shop-context"
import { Routes, Route, Link } from "react-router-dom"
import "./product.css"

export const Product = props => {
  const { cartItems, addToCart, removeFromCart } = useContext(ShopContext)
  // console.log(cartItems)
  console.log(props.data.id)
  return (
    <div className="product">
      <Link to={`/api/item/${props.data.id}`}>
        <img src={props.data.image_url} alt="" />
        <div className="description">
          <p>{props.data.title}</p>
          <p>${props.data.price}</p>
        </div>
      </Link>
      <button
        className="addTocartBttn"
        onClick={() => addToCart(props.data.id)}
      >
        Add To Cart
      </button>
    </div>
  )
}
