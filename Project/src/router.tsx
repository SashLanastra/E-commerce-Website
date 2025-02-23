import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Cart from "@/pages/Cart";
import LikesPage from "@/pages/LikesPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import { ProductListSkeleton } from "@/components/SuspenseSkeletons/ProductList";
import { lazy, Suspense } from "react";
import PageNotFound from "./pages/PageNotFound";

export const ProductList = lazy(() => import("@/pages/ProductList"))

// Wrapper component to avoid repetition
const LazyComponent = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<ProductListSkeleton />}>
    {children}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/products" replace />,
      },
      {
        path: "products",
        element: <LazyComponent><ProductList /></LazyComponent>,
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
      },

      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "likes",
        element: <LikesPage />,
      },
      {
        path: "*",  // Catch all unmatched routes
        element: <PageNotFound />,
      },
    ],
  },
]);
