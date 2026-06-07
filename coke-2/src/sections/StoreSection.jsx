import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import api from "../api/client";

const StoreSection = () => {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    let uploadedImagePath = newProduct.image;

    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
          const { data: uploadData } = await api.post("/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          uploadedImagePath = uploadData.image;
        } catch {
          alert('Failed to upload image');
          setLoading(false);
          return;
        }
      }

      const { data: addedProduct } = await api.post("/products", {
        ...newProduct,
        image: uploadedImagePath
      });
      setProducts([...products, addedProduct]);
      setShowAddModal(false);
      setNewProduct({ name: '', price: '', image: '' });
      setImageFile(null);
    } catch (error) {
      console.error("Failed to add product", error);
      alert('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const shouldDelete = window.confirm("Do you want to remove this product?");
    if (!shouldDelete) return;

    try {
      setDeletingProductId(productId);
      await api.delete(`/products/${productId}`);
      setProducts((prev) => prev.filter((product) => (product._id || product.id) !== productId));
    } catch (error) {
      console.error("Failed to remove product", error);
      alert(error?.response?.data?.message || "Failed to remove product");
    } finally {
      setDeletingProductId(null);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen w-full px-10 py-8">

      {/* Discount Section */}
      <div className="my-[5vw]">

        <h1 className="text-3xl font-bold mb-2">
          Pure Refreshment Big Discount
        </h1>

        <p className="text-gray-400 mb-4">
          Save up to 50% off on your first order
        </p>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Your email address"
            className="bg-black border border-gray-600 px-4 py-2 rounded-md"
          />

          <button className="bg-lime-400 text-black px-5 py-2 rounded-md font-semibold">
            Get Coupon
          </button>
        </div>

      </div>

      {/* Products */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Popular Products
        </h2>
        
        {user && user.role === 'seller' && (
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg"
          >
            + Add Product
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {products.map((item) => (
          <ProductCard
            key={item._id || item.id}
            data={item}
            user={user}
            deletingProductId={deletingProductId}
            onDeleteProduct={handleDeleteProduct}
          />
        ))}

      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Add New Product</h2>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="e.g. Cherry Coke"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Price ($)</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  min="0"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="e.g. 2.99"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-red-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-xl transition-colors mt-6 disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? 'Adding...' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default StoreSection;
