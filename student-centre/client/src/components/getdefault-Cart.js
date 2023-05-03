import { fetchItems } from "../utils/items_api"

export async function GetDefaultCart() {
  //   const [existingItem, setExistingItem] = useState([])
  //   const [cart, setCart] = useState({})
  //   useEffect(() => {
  //     async function getData() {
  //       setExistingItem(await fetchItems())
  //     }
  const items = await fetchItems()

  let idArr = items.map(elem => elem.id)
  console.log(idArr)
  let initObj = {}
  for (let i = 0; i < idArr.length; i++) {
    console.log(idArr[i])
    initObj[idArr[i]] = 0
  }

  return [initObj, items]
}
