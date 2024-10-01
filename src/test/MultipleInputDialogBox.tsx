import { useState, FormEvent, FC } from "react";
import { useSelector } from "react-redux";
import ButtonMUI from "../components/common/button/ButtonMUI";
import SimpleDialog from "../components/common/dialog/SimpleDialog";
import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { RootState } from "../store";

const MultipleInputDialogBox: FC = () => {
  const { postsDataErrorMsg, submitLoader } = useSelector(
    (state: RootState) => state.posts
  );

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [postContent, setPostContent] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("");

  const handleDialogOpen = () => setOpenDialog(true);

  const handleClickDialogClose = () => {
    setOpenDialog(false);

    setPostContent("");
    setEmail("");
    setSelectValue("");
  };

  const submitFormProps = {
    component: "form",
    onSubmit: async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(postContent, email, selectValue);
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
        ariaLabelMsg={"Create a new post."}
        loadingState={submitLoader}
        loadingStateText="Posting..."
      >
        <Box sx={{ width: 800, maxWidth: "100%" }}>
          {postsDataErrorMsg && (
            <Box sx={{ color: "red" }}>
              Error in creating post. Please try later.
            </Box>
          )}
          <TextField
            autoFocus
            required
            margin="dense"
            name="postContent"
            fullWidth
            id="post-content-input-box"
            variant="outlined"
            multiline
            rows={4}
            placeholder="What's on your mind, User?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />

          <TextField
            required
            margin="dense"
            name="email"
            fullWidth
            id="email-input-box"
            variant="outlined"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            select
            required
            margin="dense"
            name="selectValue"
            fullWidth
            id="select-input-box"
            variant="outlined"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </TextField>
        </Box>
      </SimpleDialog>
    </div>
  );
};

export default MultipleInputDialogBox;
