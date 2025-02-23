import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ProductProvider } from "@/providers/ProductProvider";
import { CartProvider } from "@/providers/CartProvider";
import { LikesProvider } from "@/providers/LikesProviders";
import { router } from "@/router";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProductProvider>
        <CartProvider>
          <LikesProvider>
            <RouterProvider router={router} />
          </LikesProvider>
        </CartProvider>
      </ProductProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
