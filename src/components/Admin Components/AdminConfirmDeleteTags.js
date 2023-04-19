import React from "react";
import { useDeleteChoosenTagsMutation } from "../../redux/store";
import Button from "../UI/Button";
import "../../styles/confirmDeleteProduct.css";

const AdminConfirmDeleteTags = ({ onCloseModal, tags }) => {
  const [deleteTags, deleteProductResults] = useDeleteChoosenTagsMutation();
  const deleteTagsHandler = () => {
    deleteTags(tags);
    onCloseModal();
  };
  return (
    <div className="confirm_delete-container">
      <div className="confirm_delete_form-container">
        <h3 className="confirm_delete_form-title">
          {`Are You sure, You want to delete this ${
            tags.length === 1 ? "tag" : "tags"
          }?`}
        </h3>
        <p className="confirm_delete_form-paragraph">
          {tags.map((tag) => `"${tag}" `)}
        </p>
        <div className="confirm_delete-buttons">
          <Button className="confirm_goback-btn" onClick={() => onCloseModal()}>
            Go back
          </Button>
          <Button
            danger
            className="confirm_confirm-btn"
            onClick={() => deleteTagsHandler()}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminConfirmDeleteTags;
