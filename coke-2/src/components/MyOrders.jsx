import React, { useState, useEffect } from "react";
import api from "../api/client";

const MyOrders = ({ closeOrders }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getImageSrc = (imagePath = "") => {
    if (!imagePath) return "/images/logo2.png";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/orders/all");
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAcceptOrder = async (orderId, currentDeliveryTime) => {
    const deliveryTime = prompt(
      "Enter delivery duration (e.g. 2 days, 3-5 days):",
      currentDeliveryTime || "2-3 days"
    );
    if (!deliveryTime) return;

    try {
      await api.put(`/orders/${orderId}/accept`, { deliveryTime });
      alert("Order Accepted and Email Sent!");
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Error occurred");
    }
  };

  return (
    <div className="h-full p-[5vw] md:p-[2vw] overflow-y-auto text-black bg-red-600">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-black text-white px-4 py-2 rounded">Seller Orders</h1>
        <button
          onClick={closeOrders}
          className="border-2 border-black text-black font-semibold px-6 py-2 rounded-full hover:bg-black hover:text-white transition cursor-pointer"
        >
          Close
        </button>
      </div>

      {loading && <p className="text-center mt-4">Loading orders...</p>}

      <div className="space-y-8">
        {orders.length === 0 && !loading && (
          <p className="text-center font-medium mt-10 text-gray-500">No orders found.</p>
        )}

        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            
            {/* Split Layout Container */}
            <div className="flex flex-col md:flex-row">
              
              {/* LEFT SIDE: The Image Container */}
              <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-200 flex justify-center">
                {order.items.map((item, idx) => (
                  <img
                    key={idx}
                    src={getImageSrc(item.image)}
                    alt={item.name}
                    className="h-full md:w-[20vw] w-[50%] object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/images/logo2.png";
                    }}
                  />
                ))}
              </div>

              {/* RIGHT SIDE: All Details */}
              <div className="w-full md:w-2/3 lg:w-3/4 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-tight">
                        {order.items.map(i => i.name).join(", ")}
                      </h2>
                      <p className="text-sm text-gray-400 font-mono">Order ID: {order._id}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase ${
                      order.status === "Accepted" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 border-t border-gray-100 pt-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-400 block">Customer Name</label>
                      <p className="font-semibold">{order.user?.name || "Unknown"}</p>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-400 block">Contact Email</label>
                      <p className="font-semibold truncate">{order.user?.email}</p>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-400 block">Quantity</label>
                      <p className="font-semibold text-lg">{order.items.reduce((acc, item) => acc + item.qty, 0)} Pcs</p>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-400 block">Phone Number</label>
                      <p className="font-semibold">{order.phone}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] uppercase font-bold text-gray-400 block">Shipping Address</label>
                      <p className="text-gray-700 leading-relaxed">{order.address}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t pt-4">
                  <div className="text-left w-full md:w-auto">
                    <p className="text-sm text-gray-500">Total Payable</p>
                    <p className="text-2xl font-black text-red-600">Rs. {order.totalAmount}</p>
                  </div>

                  {order.status !== "Accepted" && order.status !== "Delivered" ? (
                    <button
                      onClick={() => handleAcceptOrder(order._id, order.deliveryTime)}
                      className="w-full md:w-auto bg-black hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md active:scale-95"
                    >
                      Accept Order
                    </button>
                  ) : (
                    <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-200 text-sm">
                      Expected Delivery: <span className="font-bold">{order.deliveryTime}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;