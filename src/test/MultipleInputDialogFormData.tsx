import { useState, FormEvent, FC } from "react";
import { useSelector } from "react-redux";
import ButtonMUI from "../components/common/button/ButtonMUI";
import SimpleDialog from "../components/common/dialog/SimpleDialog";
import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { RootState } from "../store";

const MultipleInputDialogBoxFormData: FC = () => {
  const { postsDataErrorMsg, submitLoader } = useSelector(
    (state: RootState) => state.posts
  );

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleDialogOpen = () => setOpenDialog(true);

  const handleClickDialogClose = () => {
    setOpenDialog(false);
  };

  const submitFormProps = {
    component: "form",
    onSubmit: async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      console.log("formData in edit post", formData, typeof formData);
      console.log("formJson in edit post", formJson);

      const { postContent, email, selectValue } = formJson;
      console.log(postContent, email, selectValue);
    },
  };

  return (
    <div>
      <ButtonMUI
        btnText={"Multiple Input Form Data"}
        eventHandler={handleDialogOpen}
      />
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
          />

          <TextField
            select
            required
            margin="dense"
            name="selectValue"
            fullWidth
            id="select-input-box"
            variant="outlined"
            value={"option1"}
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

export default MultipleInputDialogBoxFormData;
