import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ProductProvider } from './context/ProductProvider.tsx'
import { CartProvider } from './context/CartProvider.tsx'
import { LikesProvider } from './context/LikeProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ProductProvider>
        <CartProvider>
          <LikesProvider>
            <App />
          </LikesProvider>
        </CartProvider>
      </ProductProvider>
  </React.StrictMode>,
)
