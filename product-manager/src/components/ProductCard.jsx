import { useState } from "react";
import axios from "axios";

function ProductCard({ product, deleteProduct, updateProduct }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(
    product.images?.length
      ? `http://localhost:5000/uploads/${product.images[0]}`
      : "https://picsum.photos/400"
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);

      if (image) {
        formData.append("images", image);
      }

      await axios.put(
        `http://localhost:5000/api/products/${product.id}`,
        formData
      );

      updateProduct({
        ...product,
        name,
        price,
        images: [preview],
      });

      setIsEditing(false);
      alert("Updated ✅");

    } catch (err) {
      console.log(err);
      alert("Update failed ❌");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">

      <img
        src={
          product.images?.length
            ? `http://localhost:5000/uploads/${product.images[0]}`
            : preview
        }
        className="w-full h-48 object-cover"
      />

      <div className="flex gap-2 overflow-x-auto">
        {product.images?.map((img, i) => (
          <img
            key={i}
            src={`http://localhost:5000/uploads/${img}`}
            className="w-16 h-16 object-cover rounded"
          />
        ))}
      </div>

      <div className="p-4 space-y-2">

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

            <input type="file" onChange={handleImageChange} />
          </>
        ) : (
          <>
            <h2 className="font-semibold text-lg">{name}</h2>
            <p className="text-blue-600 font-bold">₹ {price}</p>
          </>
        )}

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