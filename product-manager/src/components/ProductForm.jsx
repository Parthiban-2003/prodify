import { useState } from "react";

function ProductForm({ addProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState(""); // ✅ added
  const [preview, setPreview] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previewUrls = files.map((file) =>
      URL.createObjectURL(file)
    );
    setPreview(previewUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name,
      price,
      category, // ✅ added
      image: preview[0] || "https://picsum.photos/400/300"
    };

    addProduct(newProduct);

    // reset form
    setName("");
    setPrice("");
    setCategory(""); // ✅ reset
    setImages([]);
    setPreview([]);
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
            placeholder="Enter product name"
            className="border mt-1 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Price</label>
          <input
            type="number"
            placeholder="Enter price"
            className="border mt-1 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* 🔥 CATEGORY (NEW FEATURE) */}
        <div>
          <label className="text-sm text-gray-600">Category</label>
          <select
            className="border mt-1 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Food">Food</option>
          </select>
        </div>

        {/* Upload */}
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="hidden"
            id="fileUpload"
          />
          <label htmlFor="fileUpload" className="cursor-pointer text-gray-600">
            📸 Click or Drag images here
          </label>
        </div>

        {/* Preview */}
        {preview.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {preview.map((src, i) => (
              <div key={i} className="relative">
                <img
                  src={src}
                  alt="preview"
                  className="w-full h-24 object-cover rounded-lg shadow"
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

        <button className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-lg font-medium shadow transition">
          Upload Product
        </button>
      </form>
    </div>
  );
}

export default ProductForm;