import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import ProductModal from "../ProductModal";
import CancelOrderModal from "../CancelOrderModal";

const OrderItem = ({ order }) => {
  const [cancelOrder, setCancelOrder] = useState(false);

  const closeModalHandler = () => {
    setCancelOrder(false);
  };
  const createdAt = new Date(order.createdAt).toISOString().slice(0, 10);

  return (
    <div
      className={`order_item-container ${
        order.status === "Prepearing"
          ? "status-prepearing"
          : order.status === "Dispatched"
          ? "status-dispatched"
          : order.status === "Delivered"
          ? "status-delivered"
          : order.status === "Canceled"
          ? "status-canceled"
          : null
      }`}
    >
      <div className="order-id">{order._id}</div>
      <div className="order-date">{createdAt}</div>
      <div className="order-titles">
        {order.orderItems.map((item) => (
          <p key={item.title}>
            {item.title} - ({item.quantity})
          </p>
        ))}
      </div>
      <div className="order-total-price">
        <p>${order.totalPrice.toFixed(2)}</p>
      </div>
      <div className="order_change_status-container">
        <p>{order.status}</p>
        {order.status !== "Canceled" &&
          order.status !== "Dispatched" &&
          order.status !== "Delivered" && (
            <Formik
              initialValues={{ status: "" }}
              onSubmit={(values, actions) => {
                setCancelOrder(true);
              }}
            >
              {({ errors, touched, values, handleChange, setFieldValue }) => (
                <Form className="order_change_status-form">
                  <button className="order_cancel-btn">Cancel order</button>
                </Form>
              )}
            </Formik>
          )}
      </div>
      {cancelOrder && (
        <ProductModal wrapperId="cancelOrderModal">
          <CancelOrderModal
            onCloseModal={() => closeModalHandler()}
            orderId={order._id}
          />
        </ProductModal>
      )}
    </div>
  );
};

export default OrderItem;
