import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/store";
import {
  useGetAllProductsQuery,
  useGetCategoriesAndPreviewQuery,
} from "../redux/store";
import { createGlobalStyle } from "styled-components";
import { useSelectedTags } from "./zustand/store";
import Button from "./UI/Button";

const ProductsList = ({ products, searchByCategory, clearSearch }) => {
  const location = useLocation();
  const { category } = useParams();
  const navigate = useNavigate();
  const choosenCategory = useSelector(
    (state) => state.products.categoryChoosen
  );
  const { data, error, isFetching } = useGetAllProductsQuery(category);
  const { tags, setTags, resetTags } = useSelectedTags((state) => state);
  const dispatch = useDispatch();

  const addToCartHandler = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const goBackHandler = () => {
    if (tags.length === 0) {
      navigate("/products");
    } else {
      resetTags();
      clearSearch();
    }
  };

  const moveToProductPage = (productId) => {
    // e.stopPropagation();
    navigate(`${productId}`);
  };

  return (
    <>
      <div className="products-content">
        <h2 className="products-title">Products</h2>
        <Button
          danger
          padding="0 10px"
          onClick={goBackHandler}
          className="products_goback-btn"
        >
          Back to collections
        </Button>
        {!searchByCategory && products && products.length > 0 ? (
          <div className="product_list-container">
            {products.map((product) => (
              <div
                key={product._id}
                className="product_list-item"
                onClick={() => moveToProductPage(product._id)}
              >
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/images/${product.imagePath}`}
                  alt="product"
                  className="product_item-image"
                />
                <p className="product_item-title">{product.title}</p>
                <p className="product_item-description">
                  {product.description}
                </p>
                <div className="product-add-to-cart">
                  <Button
                    height="40px"
                    padding="0 10px"
                    className="addtocart-btn"
                    onClick={(e) => addToCartHandler(e, product)}
                  >
                    Add to cart
                  </Button>
                  <span className="product_item-price">£{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        ) : searchByCategory && data ? (
          <div className="product_list-container">
            {data.map((product) => (
              <div
                key={product._id}
                className="product_list-item"
                onClick={() => moveToProductPage(product._id)}
              >
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/images/${product.imagePath}`}
                  alt="product"
                  className="product_item-image"
                />
                <p className="product_item-title">{product.title}</p>
                <p className="product_item-description">
                  {product.description}
                </p>
                <div className="product-add-to-cart">
                  <Button
                    height="40px"
                    padding="0 10px"
                    className="addtocart-btn"
                    onClick={(e) => addToCartHandler(e, product)}
                  >
                    Add to cart
                  </Button>
                  <span className="product_item-price">£{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3 className="products_title-notfound">Products not found</h3>
        )}
      </div>
    </>
  );
};

export default ProductsList;
