import React, { useEffect, useState } from "react"
// import { PRODUCTS } from "../../products"
import { Product } from "./product"
import "./shop.css"
import { deleteItem, fetchItems, fetchOneItem } from "../../utils/items_api"

export const Shop = ({ products, setProducts }) => {
  useEffect(() => {
    async function getData() {
      setProducts(await fetchItems())
    }
    getData()
  }, [])
  // deleteItem(4)
  // console.log()
  console.log(products)
  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Market Listing</h1>
      </div>
      <div className="products">
        {products.map(product => {
          return <Product data={product} key={product.id} />
        })}
      </div>
    </div>
  )
}
