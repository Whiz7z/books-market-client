import React, { useState, useEffect, useRef } from "react";
import { useGetAllMessagesQuery } from "../../redux/store";
import AdminMessageItem from "../../components/Admin Components/AdminMessageItem";
import { nanoid } from "nanoid";
import "../../styles/adminMessages.css";

const AdminMessages = () => {
  const { data, error, isFetching, isSuccess } = useGetAllMessagesQuery();

  const [sortedBy, setSortedBy] = useState("none");

  const sorted = useRef();
  useEffect(() => {
    if (data && isSuccess) {
      sorted.current = data.slice();
    }
  }, [data, isSuccess]);

  const sortByDate = () => {
    if (data && isSuccess && sortedBy !== "fromNewDate") {
      setSortedBy("fromNewDate");
      sorted.current = data.slice().sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else if (data && isSuccess && sortedBy !== "none") {
      setSortedBy("none");
      sorted.current = data.slice().sort(function (a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    }
  };

  const sortByStatus = () => {
    if (data && isSuccess && sortedBy !== "byUnread") {
      setSortedBy("byUnread");
      sorted.current = data.slice().sort((a, b) => {
        if (a.isRead === false && b.isRead !== false) {
          return -1;
        } else {
          return 1;
        }
      });
      console.log("byunRead");
    } else if (data && isSuccess && sortedBy !== "byRead") {
      setSortedBy("byRead");
      sorted.current = data.slice().sort((a, b) => {
        if (a.isRead === true && b.isRead !== true) {
          return -1;
        } else {
          return 1;
        }
      });
      console.log("byRead");
    }
  };

  const statusChangesHandler = () => {
    setSortedBy("none");
    sorted.current = undefined;
  };

  useEffect(() => {
    if (sorted.current) {
      console.log(sorted.current);
    }
  }, [sorted]);

  return (
    <div className="messages_wrapper">
      <h2 className="messages_main-title">Messages</h2>
      <div className="messages_container">
        <div className="messages-titles">
          <div className="message_date-title" onClick={() => sortByDate()}>
            Date
          </div>
          <div className="message_email-title">Email</div>
          <div className="message_text-title">Message</div>
          <div className="message_status-title" onClick={() => sortByStatus()}>
            Status{" "}
            {sortedBy === "byRead"
              ? "(Read)"
              : sortedBy === "byUnread"
              ? "(Unread)"
              : null}
          </div>
        </div>
        {data && sortedBy === "none"
          ? data.map((message) => (
              <AdminMessageItem
                message={message}
                key={nanoid(7)}
                statusChanged={() => statusChangesHandler()}
              />
            ))
          : data &&
            sorted.current.map((message) => (
              <AdminMessageItem
                message={message}
                key={nanoid(7)}
                statusChanged={() => statusChangesHandler()}
              />
            ))}
      </div>
    </div>
  );
};

export default AdminMessages;
