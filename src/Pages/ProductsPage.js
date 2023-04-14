import React, { useState, useEffect, useCallback } from "react";
import Menu from "../components/Menu";
import TagsSearchBar from "../components/TagsSearchBar";
import ProductsList from "../components/ProductsList";
import { useSelector } from "react-redux";
import { useLazyGetProductsByTagsQuery } from "../redux/store";
import { useDispatch } from "react-redux";
import { setProducts } from "../redux/store";
import CollectionsList from "../components/CollectionsList";
import {
  Routes,
  Route,
  useParams,
  useLocation,
  Navigate,
} from "react-router-dom";

const ProductsPage = ({ props }) => {
  const location = useLocation();
  const [showProductList, setShowProductList] = useState(false);
  const searchedProducts = useSelector((state) => state.products.products);
  const [trigger, { data: findedProductsByTags, isSuccess }] =
    useLazyGetProductsByTagsQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchedProducts && searchedProducts.length === 0) {
      localStorage.removeItem("searchedProducts");
    }
  }, [searchedProducts]);

  useEffect(() => {
    if (location.state) {
      console.log(location);
      trigger(location.state.tags);
    }
  }, [location]);

  useEffect(() => {
    if (findedProductsByTags) {
      console.log(findedProductsByTags);
    }
  }, [findedProductsByTags]);

  const searchHandler = (tags) => {
    if (tags.length > 0) {
      setShowProductList(false);
      trigger(tags).then((res) => {
        console.log(res.status);
      });
    }
  };

  const clearSearch = () => {
    setShowProductList(true);
  };

  return (
    <div className="products-wrapper">
      <div className="products-sidebar">
        <TagsSearchBar onSearch={searchHandler} onClearSearch={clearSearch} />
      </div>

      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              {findedProductsByTags && isSuccess && !showProductList ? (
                <ProductsList
                  products={findedProductsByTags}
                  searchByCategory={false}
                  clearSearch={clearSearch}
                />
              ) : (
                <div className="products-content">
                  <CollectionsList />
                </div>
              )}
            </>
          }
        ></Route>
        <Route
          exact
          path="category/:category"
          element={
            <ProductsList searchByCategory={true} clearSearch={clearSearch} />
          }
        ></Route>
        <Route
          exact
          path="tags/:tags"
          element={
            !showProductList ? (
              <ProductsList
                searchByCategory={false}
                clearSearch={clearSearch}
                products={findedProductsByTags}
              />
            ) : (
              <Navigate to="/products" />
            )
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default ProductsPage;
