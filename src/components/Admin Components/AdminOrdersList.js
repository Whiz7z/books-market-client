import React, { useEffect, useRef, useState } from "react";
import { useGetAllOrdersQuery } from "../../redux/store";
import AdminOrderItem from "./AdminOrderItem";
import { CgShoppingCart } from "react-icons/cg";

const AdminOrdersList = () => {
  const { data, error, isFetching, isSuccess } = useGetAllOrdersQuery();
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

  const sortByPrice = () => {
    if (data && isSuccess && sortedBy !== "fromHighPrice") {
      setSortedBy("fromHighPrice");
      sorted.current = data.slice().sort(function (a, b) {
        return b.totalPrice - a.totalPrice;
      });
    } else if (data && isSuccess && sortedBy !== "fromLowPrice") {
      setSortedBy("fromLowPrice");
      sorted.current = data.slice().sort(function (a, b) {
        return a.totalPrice - b.totalPrice;
      });
    }
    console.log("by price", sorted.current);
  };

  const sortByStatus = () => {
    if (
      data &&
      isSuccess &&
      sortedBy !== "byPrepearing" &&
      sortedBy !== "byDispatched" &&
      sortedBy !== "byDelivered"
    ) {
      setSortedBy("byPrepearing");
      sorted.current = data.slice().sort((a, b) => {
        if (a.status === "Prepearing" && b.status !== "Prepearing") {
          return -1;
        } else {
          return 1;
        }
      });
    } else if (
      data &&
      isSuccess &&
      sortedBy !== "byDispatched" &&
      sortedBy !== "byCanceled" &&
      sortedBy !== "byDelivered"
    ) {
      setSortedBy("byDispatched");
      sorted.current = data.slice().sort((a, b) => {
        if (a.status === "Dispatched" && b.status !== "Dispatched") {
          return -1;
        } else {
          return 1;
        }
      });
    } else if (data && isSuccess && sortedBy !== "byDelivered") {
      setSortedBy("byDelivered");
      sorted.current = data.slice().sort((a, b) => {
        if (a.status === "Delivered" && b.status !== "Delivered") {
          return -1;
        } else {
          return 1;
        }
      });
    } else if (data && isSuccess && sortedBy !== "byCanceled") {
      setSortedBy("byCanceled");
      sorted.current = data.slice().sort((a, b) => {
        if (a.status === "Canceled" && b.status !== "Canceled") {
          return -1;
        } else {
          return 1;
        }
      });
    }
  };

  console.log(data);
  return (
    <div className="order_list-page">
      <h2 className="order-title">Orders</h2>
      <div className="order_list-container">
        <div className="order-main-titles-admin">
          <div className="order-title-id">Order Id</div>
          <div className="order-title-date" onClick={() => sortByDate()}>
            Date
          </div>
          <div className="order-items">Items</div>
          <div className="order-user-info">User info</div>
          <div className="order-price" onClick={() => sortByPrice()}>
            Price
          </div>
          <div className="order-status" onClick={() => sortByStatus()}>
            Status <br />
            {sortedBy === "byPrepearing"
              ? "(Prepeared)"
              : sortedBy === "byDispatched"
              ? "(Dispatched)"
              : sortedBy === "byDelivered"
              ? "(Delivered)"
              : sortedBy === "byCanceled"
              ? "(Canceled)"
              : null}
          </div>
        </div>
        {data && sorted.current
          ? sorted.current.map((order) => (
              <AdminOrderItem key={order._id} order={order} />
            ))
          : data &&
            data.map((order) => (
              <AdminOrderItem key={order._id} order={order} />
            ))}
      </div>
    </div>
  );
};

export default AdminOrdersList;
