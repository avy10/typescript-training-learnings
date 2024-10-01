import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { FC, ReactElement } from "react";
import { SxProps } from "@mui/material";

interface GenericModalProps {
  customStyles?: SxProps;
  modalTitle?: string;
  modalDescription?: string;
  openModal: boolean;
  handleModalClose: () => void;
  needBox?: boolean;
  children: ReactElement;
}

const GenericModal: FC<GenericModalProps> = ({
  children,
  customStyles = {},
  modalTitle = "generic-modal",
  modalDescription = "this-is-a-generic-modal",
  openModal,
  handleModalClose,
  needBox = true,
}) => {
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

  return needBox ? (
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
  ) : (
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
