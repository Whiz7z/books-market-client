import React, { useState } from "react";
import Button from "../UI/Button";

import { useUpdateMessageStatusMutation } from "../../redux/store";

const AdminMessageItem = ({ message, statusChanged }) => {
  const [updateMessageStatus, results] = useUpdateMessageStatusMutation();
  const changeReadStatus = (id) => {
    updateMessageStatus({ id: id });
    statusChanged();
  };
  return (
    <div
      className={`message-item ${
        message.isRead ? "status-read" : "status-unread"
      }`}
    >
      <div className="message-date">
        {new Date(message.createdAt).toISOString().slice(0, 10)}
      </div>
      <div className="message_sender-email">{message.email}</div>
      <div className="message_text-message">{message.message}</div>
      <div className="message_status-container">
        <p className="message_status">{message.isRead ? "Read" : "Unread"}</p>
        <Button
          className="message_change_status-btn"
          onClick={() => changeReadStatus(message._id)}
        >
          Mark as {message.isRead ? "unread" : "read"}
        </Button>
      </div>
    </div>
  );
};

export default AdminMessageItem;
