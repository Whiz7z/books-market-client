import React from "react";
import { Link } from "react-router-dom";
import "../styles/mainPage.css";
import Contact from "../components/Profile/Contact";
import { useGetProductOfTheWeekQuery } from "../redux/store";

const MainPage = () => {
  const { data, error, isFetching, isSuccess } = useGetProductOfTheWeekQuery();
  console.log(data);
  return (
    <div className="main-page-wrapper">
      {data && isSuccess ? (
        <div className="main-page-banner">
          <img
            crossorigin="anonymous"
            src={`https://books-market-server.onrender.com/images/${data.imagePath}`}
            alt="product"
            className="main-page-banner-img"
          />
          <h1 className="main-page-title-product">Product of the weekk</h1>
          <Link
            to={`/products/${data._id}`}
            className="main-page_banner-link-product"
          >
            Buy noww
          </Link>
        </div>
      ) : isFetching ? (
        <div className="main-page-banner">
          <h1 className="main-page-title">Loading...</h1>
        </div>
      ) : (
        <div className="main-page-banner">
          <h1 className="main-page-title">We are open!!!</h1>
          <Link to="/products" className="main-page_banner-link">
            Go to productss
          </Link>
        </div>
      )}

      <Contact />
    </div>
  );
};

export default MainPage;
