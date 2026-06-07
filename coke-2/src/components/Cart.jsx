import React, { useCallback, useEffect, useRef, useState } from "react";
import Checkout from "./Checkout";
import api from "../api/client";

const Cart = ({ closeCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const hasInitializedSelection = useRef(false);

  const getItemProductId = (item) => item?.product?._id?.toString();

  const applyCartData = useCallback((items = []) => {
    setCartItems(items);
    const sum = items.reduce((acc, item) => acc + item.product.price * item.qty, 0);
    setTotal(sum);

    const itemIds = items.map(getItemProductId).filter(Boolean);
    setSelectedProductIds((prev) => {
      if (!hasInitializedSelection.current) {
        hasInitializedSelection.current = true;
        return itemIds;
      }
      return prev.filter((id) => itemIds.includes(id));
    });
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      const { data } = await api.get("/cart");
      return data.items || [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }, []);

  const handleRemove = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);
      const items = await fetchCart();
      applyCartData(items);
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchCart().then((items) => {
      if (isMounted) applyCartData(items);
    });
    return () => { isMounted = false; };
  }, [applyCartData, fetchCart]);

  const handleCheckoutClick = () => {
    if (selectedItems.length === 0) return alert("Select at least one item to checkout");
    setShowCheckout(true);
  };

  const toggleSelectItem = (productId) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const allItemIds = cartItems.map(getItemProductId).filter(Boolean);
  const allSelected = cartItems.length > 0 && selectedProductIds.length === cartItems.length;
  const selectedIdSet = new Set(selectedProductIds);
  const selectedItems = cartItems.filter((item) => selectedIdSet.has(getItemProductId(item)));
  const selectedTotal = selectedItems.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(allItemIds);
    }
  };

  if (showCheckout) {
    return (
      <Checkout
        cartItems={selectedItems}
        total={selectedTotal}
        selectedProductIds={selectedProductIds}
        onBack={() => setShowCheckout(false)}
        onComplete={(orderedProductIds) => {
          const orderedSet = new Set((orderedProductIds || selectedProductIds).map(String));
          const remainingItems = cartItems.filter(
            (item) => !orderedSet.has(getItemProductId(item))
          );
          applyCartData(remainingItems);
          setShowCheckout(false);
          closeCart();
        }}
      />
    );
  }

  return (
    <div className="h-full p-[5vw] md:p-[2vw] overflow-y-auto bg-red-600 text-black">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black bg-black text-white px-5 py-2 rounded-lg italic">MY CART</h1>
        <button
          onClick={closeCart}
          className="border-2 border-black font-bold px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all cursor-pointer"
        >
          Close
        </button>
      </div>

      {/* Select All Bar */}
      {cartItems.length > 0 && (
        <div className="flex items-center justify-between bg-lime-400 p-4 rounded-xl shadow-sm border-black border-2 mb-6">
          <label className="flex items-center gap-3 font-bold cursor-pointer group">
            <input
              type="checkbox"
              className="w-5 h-5 accent-black cursor-pointer"
              checked={allSelected}
              onChange={toggleSelectAll}
            />
            <span className="group-hover:underline">SELECT ALL ITEMS</span>
          </label>
          <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {selectedItems.length} / {cartItems.length} Items
          </span>
        </div>
      )}

      {/* Cart Items List */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.product._id} className=" rounded-2xl shadow-md border bg-black  border-gray-200 overflow-hidden flex h-40 md:h-44">
            
            {/* LEFT SIDE: Image Container */}
            <div className="w-1/3 md:w-1/4 relative group flex justify-center">
              <img 
                src={item.product.image} 
                className="h-full md:w-[20vw] object-cover transition-transform duration-500 group-hover:scale-110" 
                alt={item.product.name} 
              />
              {/* Checkbox Overlay on Image for mobile or easy access */}
              <div className="absolute top-2 left-2">
                <input
                  type="checkbox"
                  checked={selectedIdSet.has(getItemProductId(item))}
                  onChange={() => toggleSelectItem(getItemProductId(item))}
                  className="h-6 w-6 accent-black cursor-pointer shadow-lg"
                />
              </div>
            </div>

            {/* RIGHT SIDE: Details */}
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="max-w-[70%]">
                  <h3 className="font-black text-lg md:text-xl leading-tight uppercase truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-lime-400 text-sm mt-1 font-medium">
                    Unit Price: Rs. {item.product.price}
                  </p>
                </div>
                <button 
                  onClick={() => handleRemove(item.product._id)} 
                  className="text-gray-300 hover:text-red-600 transition-colors"
                  title="Remove Item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div className="flex justify-between items-end border-t border-gray-100 pt-3">
                <div className="bg-lime-400 px-3 py-1 rounded-md">
                  <span className="text-xs text-gray-100 block font-bold">QTY</span>
                  <span className="font-black text-lg">{item.qty}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block font-bold">SUBTOTAL</span>
                  <span className="text-xl font-black text-white hover:text-red-500">
                    Rs. {item.product.price * item.qty}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {cartItems.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-2xl font-black text-gray-300">YOUR CART IS EMPTY</p>
          </div>
        )}

        {/* Footer Summary Section */}
        {cartItems.length > 0 && (
          <div className="mt-10 bg-black text-white p-6 rounded-3xl shadow-xl">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center opacity-70">
                <p className="text-sm font-bold uppercase">Total Cart Value</p>
                <p className="text-sm font-bold font-mono">Rs. {total}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xl font-black uppercase">Selected Total</p>
                <p className="text-2xl font-black text-lime-400">Rs. {selectedTotal}</p>
              </div>
            </div>
            
            <button
              onClick={handleCheckoutClick}
              className="group flex items-center justify-center gap-3 bg-lime-400 hover:bg-white text-black font-black text-xl px-4 py-4 rounded-2xl w-full transition-all active:scale-95"
            >
              PROCEED TO CHECKOUT
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;