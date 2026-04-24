import { useState } from "react";
import ProductCard from "./ProductCard";

function ProductList({ products, deleteProduct, updateProduct }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = categoryFilter
      ? product.category === categoryFilter
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-500 text-sm">Manage your products</p>
        </div>

        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 🔥 Category Filter */}
        <select
          className="border p-2 rounded w-full md:w-48"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Food">Food</option>
        </select>

      </div>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              deleteProduct={deleteProduct}
              updateProduct={updateProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;