import { useState, FormEvent, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createANewPost, clearErrorMsg, getPostsData } from "./posts/postSlice";
import ButtonMUI from "./common/button/ButtonMUI";
import SimpleDialog from "./common/dialog/SimpleDialog";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { RootState, AppDispatch } from "../store";
const CreatePost: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { postsDataErrorMsg, submitLoader } = useSelector(
    (state: RootState) => state.posts
  );

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleDialogOpen = () => setOpenDialog(true);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleClickDialogClose = () => {
    setOpenDialog(false);
    dispatch(clearErrorMsg());
  };

  const submitFormProps = {
    component: "form",
    onSubmit: async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      const postContent = formJson.postContent as string;
      // console.log("postContent", postContent);
      const response = await dispatch(
        createANewPost({ postContent, handleDialogClose })
      );
      console.log(response);
      if (response.type === "posts/createNewPost/fulfilled") {
        handleDialogClose();
        dispatch(getPostsData());
      } else {
        console.error("Failed to edit post:", response);
      }
    },
  };

  return (
    <div>
      <ButtonMUI btnText={"Create Post"} eventHandler={handleDialogOpen} />
      <SimpleDialog
        openDialog={openDialog}
        handleClickDialogClose={handleClickDialogClose}
        dialogTitle={"Create post"}
        dialogActionName={"Post"}
        paperPropsObject={submitFormProps}
        loadingState={submitLoader}
        loadingStateText="Posting..."
      >
        <Box sx={{ width: 800, maxWidth: "100%" }}>
          {postsDataErrorMsg !== "" && (
            <Box
              sx={{
                color: "red",
              }}
            >
              Error in creating post. Please try later.
            </Box>
          )}
          <TextField
            autoFocus
            required
            margin="dense"
            name="postContent"
            fullWidth
            hiddenLabel
            id="post-content-input-box"
            variant="outlined"
            multiline
            rows={12}
            placeholder="What's on your mind, User?"
          />
        </Box>
      </SimpleDialog>
    </div>
  );
};

export default CreatePost;
