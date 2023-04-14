import React, { useState } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import "../styles/main.css";
import styled from "styled-components";
import { userLogout, removeAllItems, ordersApi } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { CgShoppingCart } from "react-icons/cg";
import IconShoppingCart from "./Icons/IconShoppingCart";

const Menu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo, error, loading, updateSuccess } = user;
  const quantityOfItems = useSelector((state) => state.cart.totalItemsQuantity);
  const location = useLocation();
  let activeStyle = {
    textDecoration: "underline",
  };

  const [isHover, setIsHover] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    dispatch(userLogout());
    dispatch(removeAllItems());
    dispatch(ordersApi.util.resetApiState());
  };

  return (
    <header className="header-wrapper">
      <div className="top-menu">
        <div className="logo">Books market</div>

        {localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).token ? (
          <div className="top_menu-profile">
            <div className="menu-name">
              {JSON.parse(localStorage.getItem("userInfo")).name}
            </div>
            <span className="menu_name-slash">/</span>
            <button
              className="menu_list_logout-btn"
              onClick={() => logoutHandler()}
            >
              log out
            </button>
          </div>
        ) : (
          <Link to="login" className="menu_list_login-link">
            sing in.
          </Link>
        )}
      </div>
      <nav className="menu">
        <ul className="menu-list">
          <li className="menu-list_item">
            <NavLink
              to="main"
              style={({ isActive }) =>
                isActive | (location.pathname === "/") ? activeStyle : undefined
              }
            >
              main.
            </NavLink>
          </li>
          <li className="menu-list_item">
            <NavLink
              to="products"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              products.
            </NavLink>
          </li>
          {userInfo && userInfo.token && (
            <li className="menu-list_item">
              <NavLink
                to="profile"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                profile.
              </NavLink>
            </li>
          )}
          {userInfo && userInfo.isAdmin && (
            <li className="menu-list_item">
              <NavLink
                to="adminpanel"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                admin panel.
              </NavLink>
            </li>
          )}
        </ul>
        <div className="shoping_cart-item">
          {userInfo && userInfo.token && (
            <>
              <NavLink to="cart">
                <IconShoppingCart
                  className="shopping_cart-btn"
                  fill={isHover ? "#eab839" : "#0d0c1d"}
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                ></IconShoppingCart>
              </NavLink>
              <div className="shopping_cart-btn-quantity">
                {quantityOfItems}
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Menu;
