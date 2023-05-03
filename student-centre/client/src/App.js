import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/navbar"
import { Shop } from "./pages/shop/shop"
import { Cart } from "./pages/cart/cart"
import { ShopContextProvider } from "./components/shop-context"
import { useContext } from "react"
import LoginPage from "./pages/LoginPage"
import { useState } from "react"
import { MarketPage } from "./pages/MarketPage"
import { HomePage } from "./pages/HomePage"
import DetailPage from "./pages/DetailPage"
import CreatePage from "./pages/CreatePage"

function App() {
  const [user, setUser] = useState("")
  const [formData, setFromData] = useState({ email: "", password: "" })
  const [products, setProducts] = useState([])

  const loginData = data => {
    //ajax api call to /api/login
    setUser(data)
  }
  return (
    <div className="App">
      {user ? (
        <ShopContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={<Shop products={products} setProducts={setProducts} />}
              />
              <Route path="/cart" element={<Cart products={products} />} />
              <Route path="/api/item/:id" element={<DetailPage />} />
              <Route path="/api/create" element={<CreatePage />} />
            </Routes>
          </Router>
        </ShopContextProvider>
      ) : (
        // <ShopContextProvider>
        //
        // </ShopContextProvider>
        <LoginPage
          onLogin={loginData}
          formData={formData}
          setFromData={setFromData}
        />
      )}
    </div>
  )
}

export default App
