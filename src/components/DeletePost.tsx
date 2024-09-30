import { useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { deletePost, getPostsData, clearErrorMsg } from "./posts/postSlice";
import { Box } from "@mui/material";
import ButtonMUI from "./common/button/ButtonMUI";
import GenericModal from "./common/modal/GenericModal";
import SubmitButton from "./common/button/SubmitButton";

interface DeletePostProps {
  postID: string;
}

// const DeletePost = ({ postID }: DeletePostProps): JSX.Element => {

const DeletePost: FC<DeletePostProps> = ({ postID }) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const { submitLoader, postsDataErrorMsg } = useSelector(
    (state: RootState) => state.posts
  );
  const dispatch = useDispatch<AppDispatch>();

  const postDeletion = async (): Promise<void> => {
    const response = await dispatch(deletePost(postID));
    if (response?.meta?.requestStatus === "fulfilled") {
      closeDeleteModal();
      dispatch(getPostsData());
    }
  };

  const openDeleteModal = (): void => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = (): void => {
    setShowDeleteModal(false);
    dispatch(clearErrorMsg());
  };

  const customStyles: React.CSSProperties = { textAlign: "center" };

  return (
    <>
      <ButtonMUI
        eventHandler={openDeleteModal}
        btnText={"DELETE"}
        btnSize="small"
      />
      <GenericModal
        openModal={showDeleteModal}
        handleModalClose={closeDeleteModal}
        modalTitle="delete-post-modal"
        modalDescription="This is a window which asks the user for confirmation before deleting the post"
        customStyles={customStyles}
      >
        <h3>Are you sure you want to delete the post?</h3>
        {postsDataErrorMsg && (
          <Box
            sx={{
              color: "red",
            }}
          >
            Error in deleting post. Please try later.
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <SubmitButton
            btnText={"Yes"}
            clickHandlerFunction={postDeletion}
            loadingState={submitLoader}
            loadingStateText="Deleting..."
          />
          <ButtonMUI btnText={"No"} eventHandler={closeDeleteModal} />
        </Box>
      </GenericModal>
    </>
  );
};

export default DeletePost;
