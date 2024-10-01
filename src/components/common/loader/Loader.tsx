import CircularProgress from "@mui/material/CircularProgress";
import { Box, SxProps } from "@mui/material";
import { FC } from "react";

const Loader: FC = () => {
  const customStyles: SxProps = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "transparent",
    border: "none",
    boxShadow: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    columnGap: "10px",
  };
  return (
    <Box sx={customStyles}>
      <p>Loading Posts...</p>
      <CircularProgress size="30px" />
    </Box>
  );
};

export default Loader;
