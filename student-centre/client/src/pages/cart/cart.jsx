import React, { useContext } from "react"
import { PRODUCTS } from "../../products"
import { ShopContext } from "../../components/shop-context"
import { CartItem } from "./cart-item"
import "./cart.css"
import { useNavigate } from "react-router-dom"

export const Cart = ({ products }) => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext)
  const totalAmount = getTotalCartAmount()
  const navigate = useNavigate()

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cartItems">
        {products.map(product => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} key={product.id} />
          }
        })}
      </div>
      <div className="checkout">
        <p>subtotal: ${totalAmount}</p>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
        <button>Checkout</button>
      </div>
    </div>
  )
}
