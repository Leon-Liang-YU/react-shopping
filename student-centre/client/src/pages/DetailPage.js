import { useEffect, useState, useContext } from "react"
import { Navbar } from "../components/navbar"
import { useParams } from "react-router"

import { useNavigate } from "react-router-dom"
import { fetchOneItem, deleteItem } from "../utils/items_api"

import { ShopContext } from "../components/shop-context"
import "./DetailPage.css"

export default function DetailPage() {
  const navigate = useNavigate()
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext)
  let { id } = useParams()
  console.log(id)
  const [itemDetail, setItemDetail] = useState([])
  useEffect(() => {
    async function getItemDetail() {
      setItemDetail(await fetchOneItem(id))
    }
    getItemDetail()
  }, [id])
  //   console.log(itemDetail, "detail")

  const handledelete = () => {
    deleteItem(itemDetail[0].id)
    navigate(`/`)
  }
  return (
    <div>
      {itemDetail.length > 0 ? (
        <div>
          <img className="detail-img" src={itemDetail[0].image_url} alt="" />
          <div className="description">
            <p>
              <b>{itemDetail[0].title}</b>
            </p>
            <p>${itemDetail[0].price}</p>
            <div className="countHandler">
              <button onClick={() => removeFromCart(itemDetail[0].id)}>
                -
              </button>
              <input
                value={cartItems[itemDetail[0].id]}
                onChange={e =>
                  updateCartItemCount(Number(e.target.value), itemDetail[0].id)
                }
              />
              <button onClick={() => addToCart(itemDetail[0].id)}> + </button>
              <button onClick={() => handledelete()}>delete</button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}
