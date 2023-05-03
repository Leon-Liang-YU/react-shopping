import React, { useContext } from "react"
import { ShopContext } from "../../components/shop-context"
import { Routes, Route, Link } from "react-router-dom"
import DetailPage from "../DetailPage"

export const CartItem = props => {
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext)

  return (
    <div className="cartItem">
      <Link to={`/api/item/${props.data.id}`}>
        <img src={props.data.image_url} alt="" />
        <div className="description">
          <p>
            <b>{props.data.title}</b>
          </p>
          <p>${props.data.price}</p>
        </div>
      </Link>
      <div className="countHandler">
        <button onClick={() => removeFromCart(props.data.id)}> - </button>
        <input
          value={cartItems[props.data.id]}
          onChange={e =>
            updateCartItemCount(Number(e.target.value), props.data.id)
          }
        />
        <button onClick={() => addToCart(props.data.id)}> + </button>
      </div>
    </div>
  )
}
