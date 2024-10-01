import { useState, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { AppDispatch, RootState } from "../store";
import { deletePost, getPostsData, clearErrorMsg } from "./posts/postSlice";
import ButtonMUI from "./common/button/ButtonMUI";
import SimpleDialog from "./common/dialog/SimpleDialog";
interface DeletePostProps {
  postID: string;
}
const DeletePost: FC<DeletePostProps> = ({ postID }) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const { submitLoader, postsDataErrorMsg } = useSelector(
    (state: RootState) => state.posts
  );
  const dispatch = useDispatch<AppDispatch>();
  const postDeletion = async (): Promise<void> => {
    console.log("DELEte post is running");
    const response = await dispatch(deletePost(postID));
    console.log("response in delepost", response);
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

  return (
    <>
      <ButtonMUI
        eventHandler={openDeleteModal}
        btnText={"delete"}
        btnSize={"small"}
      />
      <SimpleDialog
        openDialog={showDeleteModal}
        handleClickDialogClose={closeDeleteModal}
        dialogTitle={"Confirm Deletion"}
        dialogActionName={"Yes"}
        ariaLabelMsg={"delete the post."}
        loadingState={submitLoader}
        loadingStateText="deleting..."
        submitBtnClickHandler={postDeletion}
      >
        <>
          <h4>Are you sure you want to delete the post?</h4>
          {postsDataErrorMsg && (
            <Box
              sx={{
                color: "red",
              }}
            >
              Error in deleting post. Please try later.
            </Box>
          )}
        </>
      </SimpleDialog>
    </>
  );
};

export default DeletePost;
