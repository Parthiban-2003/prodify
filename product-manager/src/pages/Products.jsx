import ProductList from "../components/ProductList";

function Products({ products, deleteProduct, updateProduct }) {
  return (
    <ProductList
      products={products}
      deleteProduct={deleteProduct}
      updateProduct={updateProduct}
    />
  );
}

export default Products;