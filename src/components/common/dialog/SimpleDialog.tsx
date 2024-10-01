import { ReactNode, FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ButtonMUI from "../button/ButtonMUI";
import SubmitButton from "../button/SubmitButton";

interface SimpleDialogProps {
  children: ReactNode;
  openDialog: boolean;
  handleClickDialogClose: () => void;
  dialogTitle: string;
  dialogActionName: string;
  paperPropsObject?: object;
  ariaLabelMsg?: string;
  loadingState?: boolean;
  loadingStateText?: string;
  submitBtnClickHandler?: () => Promise<void>;
}

const SimpleDialog: FC<SimpleDialogProps> = ({
  children,
  openDialog,
  handleClickDialogClose,
  dialogTitle,
  dialogActionName,
  paperPropsObject = {},
  ariaLabelMsg = "Generic Dialog Box",
  loadingState = false,
  loadingStateText = "Loading...",
  submitBtnClickHandler,
}) => {
  return (
    <Dialog
      onClose={handleClickDialogClose}
      open={openDialog}
      aria-labelledby={ariaLabelMsg}
      PaperProps={paperPropsObject}
      maxWidth={"xl"}
    >
      <DialogTitle sx={{ m: 0, p: 1 }} id="customized-dialog-title">
        {dialogTitle}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClickDialogClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>{children}</DialogContent>{" "}
      <DialogActions className="action-buttons">
        <SubmitButton
          btnText={dialogActionName}
          loadingState={loadingState}
          loadingStateText={loadingStateText}
          clickHandlerFunction={
            submitBtnClickHandler ? submitBtnClickHandler : undefined
          }
        />
        <ButtonMUI btnText={"Cancel"} eventHandler={handleClickDialogClose} />
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;
