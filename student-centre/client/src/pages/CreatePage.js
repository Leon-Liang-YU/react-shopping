import { useState } from "react"
import { createItem } from "../utils/items_api"
import { useNavigate } from "react-router-dom"
import "./CreatePage.css"

export default function CreatePage() {
  const [title, setTitle] = useState("")
  const [describe, setDescribe] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState(0)
  const [available, setAvailable] = useState(0)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    createItem({ title, describe, image, price, available })
    handleBackHome()
  }

  const handleBackHome = () => {
    navigate(`/`)
  }

  return (
    <div className="create">
      <h1>new item</h1>
      <form className="create-page" onSubmit={handleSubmit} action="">
        <input
          onChange={e => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
        />
        <input
          onChange={e => setDescribe(e.target.value)}
          type="text"
          placeholder="Describe"
        />
        <input
          onChange={e => setImage(e.target.value)}
          type="text"
          placeholder="image_url"
        />
        <input
          onChange={e => setPrice(e.target.value)}
          type="text"
          placeholder="price"
        />
        <input
          onChange={e => setAvailable(e.target.value)}
          type="text"
          placeholder="available"
        />
        <button>submit</button>
      </form>
    </div>
  )
}
{
  /*     
    
    <form action="/items" method="post">
        <div>        
            <label for="">title</label><br>
            <input type="text" name="title"/>
        </div>

        <div>
            <label for="">describe</label><br>
            <input type="text" name="describe"/>
        </div>

        <div>
            <label for="">image_url</label><br>
            <input type="text" name="image_url"/>
        </div>

        <div>
            <label for="">price</label><br>
            <input type="text" name="price"/>
        </div>

        <div>
            <label for="">available quantity</label><br>
            <input type="text" name="available">
        </div>

        <div>       
            <button>submit</button>
        </div>

    </form>

    </div>
} */
}
