import { useState } from "react";
import axios from "axios";

function ProductForm({ addProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [preview, setPreview] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previewUrls = files.map((file) =>
      URL.createObjectURL(file)
    );
    setPreview(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);

      // ✅ MULTIPLE IMAGE SUPPORT
      images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);

      // UI update fallback
      if (addProduct) {
        addProduct({
          id: Date.now(),
          name,
          price,
          category,
          images: preview,
        });
      }

      alert("Product Added ✅");

      setName("");
      setPrice("");
      setCategory("");
      setImages([]);
      setPreview([]);

    } catch (err) {
      console.log(err);
      alert("Error adding product ❌");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-lg mx-auto space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Add New Product
        </h2>

        <div>
          <label className="text-sm text-gray-600">Product Name</label>
          <input
            type="text"
            className="border mt-1 p-2 w-full rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Price</label>
          <input
            type="number"
            className="border mt-1 p-2 w-full rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Category</label>
          <select
            className="border mt-1 p-2 w-full rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Food">Food</option>
          </select>
        </div>

        <div className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer">
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="hidden"
            id="fileUpload"
          />
          <label htmlFor="fileUpload" className="cursor-pointer">
            📸 Click or Drag images here
          </label>
        </div>

        {preview.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {preview.map((src, i) => (
              <div key={i} className="relative">
                <img
                  src={src}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newPreview = preview.filter((_, index) => index !== i);
                    const newImages = images.filter((_, index) => index !== i);
                    setPreview(newPreview);
                    setImages(newImages);
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center">
            No images selected
          </p>
        )}

        <button className="bg-blue-500 text-white w-full py-2 rounded-lg">
          Upload Product
        </button>
      </form>
    </div>
  );
}

export default ProductForm;