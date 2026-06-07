import React from "react";
import api from "../api/client";

const ProductCard = ({ data, user, deletingProductId, onDeleteProduct }) => {
  const productId = data._id || data.id;
  const isSeller = user?.role === "seller";
  const canDelete = isSeller && data?.seller?.toString() === user?._id?.toString();
  const isDeleting = deletingProductId === productId;

  const handleAddToCart = async () => {
    try {
      await api.post("/cart/add", { productId, qty: 1 });
      alert(`${data.name} added to cart!`);
    } catch (err) {
      console.error(err);
      alert("Please login first to add to cart");
    }
  };

  return (
    <div className="bg-[#111] rounded-xl overflow-hidden group hover:scale-105 transition border">
      <div className="h-50 flex items-center justify-center bg-black ">
        <img
          src={data.image}
          alt={data.name}
          className="h-40 object-contain group-hover:scale-110 transition duration-300"
        />
      </div>

      <div className="p-4 flex justify-evenly items-center gap-2">
        <div>
          <p className="text-sm text-gray-300">{data.name}</p>
          <p className="text-lime-400 font-bold">Rs. {data.price}</p>
        </div>

        <button
          className="bg-white text-black rounded-full flex items-center justify-center px-5 py-1 hover:bg-lime-400 cursor-pointer"
          onClick={handleAddToCart}
        >
          {data.text || "Add to Cart"}
        </button>

        {canDelete && (
          <button
            className="bg-red-600 text-white rounded-full flex items-center justify-center px-4 py-1 hover:bg-red-700 cursor-pointer disabled:opacity-70"
            onClick={() => onDeleteProduct(productId)}
            disabled={isDeleting}
          >
            {isDeleting ? "Removing..." : "Remove"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
