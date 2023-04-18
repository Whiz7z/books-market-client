import React from "react";
import { Link } from "react-router-dom";
import "../styles/mainPage.css";
import Contact from "../components/Profile/Contact";
import { useGetProductOfTheWeekQuery } from "../redux/store";
import Button from "../components/UI/Button";

const MainPage = () => {
  const { data, error, isFetching, isSuccess } = useGetProductOfTheWeekQuery();
  console.log(data);
  return (
    <div className="main-page-wrapper">
      {data && isSuccess ? (
        <div className="main-page-banner">
          <img
            crossOrigin="anonymous"
            src={`${process.env.REACT_APP_BACKEND_URL}/images/${data.imagePath}`}
            alt="product"
            className="main-page-banner-img"
          />
          <h1 className="main-page-title-product">Product of the week</h1>
          <Button
            isLink
            linkDirection={`/products/${data._id}`}
            className="main-page_banner-link-product"
            padding={"0 30px"}
          >
            Buy now
          </Button>
        </div>
      ) : isFetching ? (
        <div className="main-page-banner">
          <h1 className="main-page-title">Loading...</h1>
        </div>
      ) : (
        <div className="main-page-banner">
          <h1 className="main-page-title">We are open!!!</h1>
          <Button
            linkDirection="/products"
            padding={"0 30px"}
            className="main-page_banner-link"
          >
            Go to products
          </Button>
        </div>
      )}

      <Contact />
    </div>
  );
};

export default MainPage;
