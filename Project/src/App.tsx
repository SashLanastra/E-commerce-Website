import Cart from "./pages/Cart"
import ProductList from "./pages/ProductList"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from "./components/Layout"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Details from "./components/Details"
import Reviews from "./components/Reviews"
import ProductDetailPage from "./pages/ProductDetailPage"
import LikesPage from "./pages/LikesPage"
import ScrollToTop from "./components/ScrollToTop"


function App(){
  
  return (
    <BrowserRouter>
      <ScrollToTop/>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<ProductList />}/>
            <Route path="cart" element={<Cart />}/>
            <Route path="about" element={<About />}/>
            <Route path="contact" element={<Contact />}/>
            <Route path="likes" element={<LikesPage />}/>

            <Route path=":id" element={<ProductDetailPage />}>
              <Route index element={<Details />}/>
              <Route path="reviews" element={<Reviews />}/>
            </Route>
          </Route>
        </Routes> 
    </BrowserRouter>
  )
}

export default App
