import { FC, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AppDispatch } from "../store";
import { RootState } from "../store";
import { editPost, getPostsData } from "./posts/postSlice";
import SimpleDialog from "./common/dialog/SimpleDialog";
interface EditPostDialogProps {
  content: string;
  postID: string;
  openDialog: boolean;
  handleDialogClose: () => void;
}

const EditPostDialog: FC<EditPostDialogProps> = ({
  content,
  postID,
  openDialog,
  handleDialogClose,
}) => {
  // const dispatch = useDispatch<AppDispatch>();
  const dispatch: AppDispatch = useDispatch();

  const { postsDataErrorMsg, submitLoader } = useSelector(
    (state: RootState) => state.posts
  );

  const submitFormProps = {
    component: "form",
    onSubmit: async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      const postContent = formJson.postContent as string;
      console.log("postContent", postContent);

      const response = await dispatch(editPost({ postID, postContent }));
      /* 
      Argument of type 'AsyncThunkAction<IEditPostResponse, IEditPostArgs, { rejectValue: IRejectedValue; state?: unknown; dispatch?: ThunkDispatch<unknown, unknown, UnknownAction> | undefined; ... 4 more ...; rejectedMeta?: unknown; }>' is not assignable to parameter of type 'UnknownAction'.ts(2345)
      */
      console.log(response);
      if (response.type === "posts/editPost/fulfilled") {
        handleDialogClose();
        dispatch(getPostsData());
      } else {
        console.error("Failed to edit post:", response);
      }
    },
  };

  return (
    <SimpleDialog
      openDialog={openDialog}
      handleClickDialogClose={handleDialogClose}
      dialogTitle={"Edit post"}
      dialogActionName={"edit"}
      paperPropsObject={submitFormProps}
      ariaLabelMsg={"Edit the post."}
      loadingState={submitLoader}
      loadingStateText="Editing..."
    >
      <Box sx={{ width: 800, maxWidth: "100%" }}>
        {postsDataErrorMsg !== "" && (
          <Box sx={{ color: "red" }}>
            Error in creating post. Please try later.
          </Box>
        )}
        <TextField
          defaultValue={content}
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
  );
};

export default EditPostDialog;
