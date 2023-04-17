import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useCancelOrderMutation } from "../redux/store";
import "../styles/confirmDeleteProduct.css";

const CancelOrderModal = ({ orderId, onCloseModal }) => {
  const [cancelOrder, results] = useCancelOrderMutation();

  const cancelOrderHandler = async () => {
    const payload = { orderId: orderId, status: "Canceled" };
    await cancelOrder(payload);
  };
  return (
    <div className="confirm_delete-container">
      <div className="confirm_delete_form-container">
        <h3 className="confirm_delete_form-title">Are you sure?</h3>
        <div className="confirm_delete-buttons">
          <button onClick={() => onCloseModal()} className="confirm_goback-btn">
            Go back
          </button>
          <button
            onClick={() => cancelOrderHandler()}
            className="confirm_confirm-btn"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
