import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get('session_id');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api_v1/payment/success?session_id=${sessionId}`
      );
      console.log(response.data.orderDetails);
      setOrderDetails(response.data.orderDetails);
    };

    fetchOrderDetails();
  }, [sessionId]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {orderDetails._id}</p>
      <p>Total Price: {orderDetails.totalPrice}</p>
      <p>Status: {orderDetails.statusDelivery}</p>
      {/* Add more fields as needed */}
    </div>
  );
}

export default OrderDetails;
