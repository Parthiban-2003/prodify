import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";

import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
    toast.success("Product added!");
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.error("Product deleted!");
  };

  const updateProduct = (updatedProduct) => {
    setProducts(
      products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      )
    );
    toast.success("Product updated!");
  };

  return (
    <MainLayout>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <Products
              products={products}
              deleteProduct={deleteProduct}
              updateProduct={updateProduct}
            />
          }
        />
        <Route
          path="/products"
          element={
            <Products
              products={products}
              deleteProduct={deleteProduct}
              updateProduct={updateProduct}
            />
          }
        />
        <Route
          path="/add-product"
          element={<AddProduct addProduct={addProduct} />}
        />
      </Routes>
    </MainLayout>
  );
}

export default App;