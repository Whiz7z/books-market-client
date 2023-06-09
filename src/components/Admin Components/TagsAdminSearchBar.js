import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { chooseCategory, setProducts } from "../../redux/store";
import {
  useGetAllProductsQuery,
  useGetAllTagsQuery,
  useLazyGetProductsByTagsQuery,
  useDeleteChoosenTagsMutation,
} from "../../redux/store";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { useSelectedTags } from "../zustand/store";
import ProductModal from "../ProductModal";
import AdminConfirmDeleteTags from "./AdminConfirmDeleteTags";

const selected = "#eab839";

const TagsSeTagsAdminSearchBar = ({ onSearch, onClearSearch }) => {
  const tagRef = useRef();
  const dispatch = useDispatch();
  const { data, error, isFetching } = useGetAllProductsQuery("all");
  const [deleteTags, result] = useDeleteChoosenTagsMutation();
  const [deleteTagsModal, setDeleteTagsModal] = useState(false);

  const {
    data: tagsData,
    error: tagsError,
    isFetching: tagsIsetching,
  } = useGetAllTagsQuery();

  const [categories, setCategories] = useState();
  const {
    tags,
    setTags,
    resetTags,
    selectedCategory,
    setCategory,
    resetCategory,
  } = useSelectedTags((state) => state);
  const choosenCategory = useSelector(
    (state) => state.products.categoryChoosen
  );

  useEffect(() => {
    if (data) {
      setCategories([...new Set(data.map((product) => product.category))]);
    }
  }, [data]);

  const chooseCategoryHandler = (category) => {
    dispatch(chooseCategory(category));
  };

  const searchByTagsHandler = (tags) => {
    onSearch(tags);
  };

  const searchByCategoryHandler = (category) => {};

  const clearSearchAndTags = () => {
    resetTags();

    onClearSearch();
  };

  const openDeleteTagsModal = () => {
    if (tags.length && tags.length > 0) setDeleteTagsModal(true);
  };

  const closeDeleteTagsModal = () => {
    setDeleteTagsModal(false);
  };

  return (
    <>
      <h2 className="categories-title">Find by tags</h2>
      <div className="categories_list-container" ref={tagRef}>
        {tagsData &&
          tagsData.map((tag) => {
            let isSelected = tags.find((el) => el === tag);
            return (
              <div
                key={tag}
                style={
                  isSelected
                    ? { backgroundColor: "#eab839" }
                    : { backgroundColor: "#6a603c" }
                }
                onMouseEnter={(e) =>
                  (e.target.style.border = "2px solid #eab839")
                }
                onMouseLeave={(e) =>
                  (e.target.style.border = "2px solid transparent")
                }
                onClick={(e) => {
                  if (tags && tags.find((el) => el === tag)) {
                    const index = tags.indexOf(tag);
                    if (index > -1) {
                      setTags(tags.filter((el) => el !== tag));
                    }
                  } else {
                    setTags([...tags, tag]);
                  }
                }}
                className="categories_list-item"
              >
                {tag}
              </div>
            );
          })}
      </div>
      <div className="tags_bar-btns">
        <Button
          isLink
          linkDirection="/adminPanel/adminProducts"
          className="categories_search_by_tags-btn"
          onClick={() => searchByTagsHandler(tags)}
        >
          Search
        </Button>
        <Button
          danger
          className="categories_clear_tags-btn"
          onClick={() => clearSearchAndTags()}
        >
          Clear
        </Button>
        <Button
          danger
          fontSize={"11px"}
          className="categories_delete_choosen_tags-btn"
          onClick={() => openDeleteTagsModal()}
        >
          Delete choosen tags completely
        </Button>
      </div>

      <h2 className="categories-title">Find by category</h2>
      <div className="categories_list-container">
        {categories &&
          categories.map((category) => {
            let isSelected = selectedCategory === category;
            return (
              <div
                className="categories_list-item"
                key={category}
                onMouseEnter={(e) =>
                  (e.target.style.border = "2px solid #eab839")
                }
                onMouseLeave={(e) =>
                  (e.target.style.border = "2px solid transparent")
                }
                style={
                  isSelected
                    ? { backgroundColor: "#eab839" }
                    : { backgroundColor: "#6a603c" }
                }
                onClick={(e) => {
                  if (selectedCategory === category) {
                    resetCategory();
                  } else {
                    setCategory(category);
                  }
                }}
              >
                {category}
              </div>
            );
          })}
        {deleteTagsModal && (
          <ProductModal wrapperId={"editProductModal"}>
            <AdminConfirmDeleteTags
              tags={tags}
              onCloseModal={() => closeDeleteTagsModal()}
            ></AdminConfirmDeleteTags>
          </ProductModal>
        )}
      </div>
    </>
  );
};

export default TagsSeTagsAdminSearchBar;
