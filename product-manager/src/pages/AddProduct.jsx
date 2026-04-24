import ProductForm from "../components/ProductForm";

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

function AddProduct({ addProduct }) {
  return <ProductForm addProduct={addProduct} />;
}

export default AddProduct;