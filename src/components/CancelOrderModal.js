import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useCancelOrderMutation } from "../redux/store";
import "../styles/confirmDeleteProduct.css";
import Button from "./UI/Button";

const CancelOrderModal = ({ orderId, onCloseModal }) => {
  const [cancelOrder, results] = useCancelOrderMutation();

  const cancelOrderHandler = async () => {
    const payload = { orderId: orderId, status: "Canceled" };
    await cancelOrder(payload);
    onCloseModal();
  };
  return (
    <div className="confirm_delete-container">
      <div className="confirm_delete_form-container">
        <h3 className="confirm_delete_form-title">Are you sure?</h3>
        <div className="confirm_delete-buttons">
          <Button
            danger
            onClick={() => onCloseModal()}
            className="confirm_goback-btn"
          >
            Go back
          </Button>
          <Button
            onClick={() => cancelOrderHandler()}
            className="confirm_confirm-btn"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
