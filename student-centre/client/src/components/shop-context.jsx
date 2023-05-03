import React, { createContext, useState, useEffect } from "react"
// import { PRODUCTS } from "../products"
// import { Product } from "../pages/shop/product"
import { fetchItems, fetchOneItem } from "../utils/items_api"
import { GetDefaultCart } from "./getdefault-Cart"

export const ShopContext = createContext(null)

export const ShopContextProvider = props => {
  //
  const [cartItems, setCartItems] = useState([])
  const [existingItem, setExistingItem] = useState([])
  useEffect(() => {
    async function getData() {
      let initCart = await GetDefaultCart()
      setCartItems(initCart[0])
      setExistingItem(initCart[1])
    }
    getData()
  }, [])

  //   const addToCart = itemId => {
  //     setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }))
  //   }
  const getTotalCartAmount = () => {
    let totalAmount = 0
    console.log(cartItems)
    console.log(existingItem)

    for (const item in cartItems) {
      console.log(item)
      if (cartItems[item] > 0) {
        console.log(item)
        let itemInfo = existingItem.filter(
          product => product.id === Number(item)
        )
        console.log(itemInfo[0].price)
        totalAmount += Number(cartItems[item]) * Number(itemInfo[0].price)
      }
    }
    return totalAmount
  }

  function addToCart(itemId) {
    setCartItems(prev => {
      return { ...prev, [itemId]: prev[itemId] + 1 }
    })
  }
  const removeFromCart = itemId => {
    setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  }

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems(prev => ({ ...prev, [itemId]: newAmount }))
  }
  const contextValue = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
  }

  //   console.log(cartItems)
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}
