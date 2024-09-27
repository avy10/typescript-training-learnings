import { FC } from "react";

import Snackbar from "@mui/material/Snackbar";

interface MessageSnackbarProps {
  open: boolean;
  onCloseHandle: () => void;
  message: string;
  vertical?: "top" | "bottom";
  horizontal?: "left" | "center" | "right";
  hideAfter?: number;
}

const MessageSnackbar: FC<MessageSnackbarProps> = ({
  open,
  onCloseHandle,
  message,
  vertical = "top",
  horizontal = "center",
  hideAfter = 14000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={hideAfter}
      onClose={onCloseHandle}
      anchorOrigin={{ vertical, horizontal }}
      message={message}
      sx={{
        width: "95vw",

        "& .MuiSnackbarContent-root": {
          width: "95vw",
        },
        "& .MuiSnackbarContent-message": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
        },
      }}
    />
  );
};

export default MessageSnackbar;
