import React, { useEffect, useState } from "react";
import axios from "axios";
import "../STYLES/AdminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    stock: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

//   imge file handler
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
  alert("Image is too large. Please choose an image under 2MB.");
  return;
}

  const reader = new FileReader();

  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxWidth = 500; // reduce width
      const scaleSize = maxWidth / img.width;

      canvas.width = maxWidth;
      canvas.height = img.height * scaleSize;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

      setImagePreview(compressedBase64);

      setFormData((prev) => ({
        ...prev,
        image: compressedBase64,
      }));
    };
  };

  reader.readAsDataURL(file);
};


//  fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://vfhome-backend2-3.onrender.com/api/products"
      );
      console.log("Fetched products:", res.data);
     setProducts(res.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


//   add new product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.description ||
      !formData.image ||
      !formData.stock ||
      !formData.category
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      console.log("Sending product:", formData);

      await axios.post(
        "https://vfhome-backend2-3.onrender.com/api/products/",
        formData
      );

      alert("Product added successfully!");

      setFormData({
        name: "",
        price: "",
        description: "",
        image: "",
        stock: "",
        category: "",
      });
      setImagePreview("");

      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };


// delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://vfhome-backend2-3.onrender.com/api/products/delete/${id}`
      );
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };


// view
  return (
    <div className="admin-products-page">
      <h1>Admin Products</h1>
      <p>Manage all your store products here.</p>

      <form className="product-form" onSubmit={handleAddProduct}>
        <h2>Add New Product</h2>

        <div className="form-grid">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
hop          <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                >
                <option value="">Select Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
          </select>

        <div className="image-upload-box">
            <label htmlFor="imageUpload" className="upload-label">
                Choose Product Image
            </label>

            <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
            />

            {imagePreview && (
                <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
        </div>
            )}
            </div>

          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={formData.stock}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="add-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      <div className="products-table-wrapper">
        <h2>All Products</h2>

        {products.length === 0 ? (
          <p className="empty-text">No products added yet.</p>
        ) : (
          <div className="products-table">
            {products.map((product) => (
              <div className="product-card-row" key={product._id}>
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>
                    <strong>Price:</strong> ₦
                    {Number(product.price).toLocaleString()}
                  </p>
                  <p>
                    <strong>Category:</strong> {product.category}
                  </p>
                  <p>
                    <strong>Stock:</strong> {product.stock}
                  </p>
                  <p>
                    <strong>Description:</strong> {product.description}
                  </p>
                </div>

                <div className="product-actions">
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;