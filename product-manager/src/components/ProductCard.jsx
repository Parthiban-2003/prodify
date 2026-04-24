import { useState } from "react";

function ProductCard({ product, deleteProduct, updateProduct }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);
  const [preview, setPreview] = useState(product.image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(file);
      setPreview(url);
    }
  };

  const handleUpdate = () => {
    updateProduct({
      ...product,
      name,
      price,
      image: preview, // updated image
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">

      {/* Image */}
      <img
        src={preview}
        alt="product"
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-2">

        {/* Edit Mode */}
        {isEditing ? (
          <>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-1 w-full rounded"
            />

            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-1 w-full rounded"
            />

            {/* 🔥 Image Upload */}
            <input
              type="file"
              onChange={handleImageChange}
              className="text-sm"
            />
          </>
        ) : (
          <>
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-blue-600 font-bold">₹ {product.price}</p>
          </>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-3">

          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => deleteProduct(product.id)}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;