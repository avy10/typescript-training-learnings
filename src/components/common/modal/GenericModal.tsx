import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";
import { SxProps } from "@mui/material";

interface GenericModalProps {
  customStyles?: SxProps;
  modalTitle?: string;
  modalDescription?: string;
  openModal: boolean;
  handleModalClose: () => void;
  needBox?: boolean;
  children: ReactNode;
}

const GenericModal = ({
  customStyles = {},
  modalTitle = "generic-modal",
  modalDescription = "this-is-a-generic-modal",
  openModal,
  handleModalClose,
  needBox = true,
  children,
}: GenericModalProps) => {
  const style: SxProps = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    ...customStyles,
  };

  if (needBox) {
    return (
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby={modalTitle}
        aria-describedby={modalDescription}
        disableEnforceFocus
      >
        <Box sx={style} className="modal-content-box">
          <Box className="close-modal-button-box">
            <IconButton
              className="modal-close-button"
              aria-label="close"
              size="large"
              onClick={handleModalClose}
            >
              <CloseIcon sx={{ color: "black", fontSize: "18px" }} />
            </IconButton>
          </Box>
          {children}
        </Box>
      </Modal>
    );
  }

  return (
    <Modal
      open={openModal}
      onClose={handleModalClose}
      aria-labelledby={modalTitle}
      aria-describedby={modalDescription}
    >
      {children}
    </Modal>
  );
};

export default GenericModal;
