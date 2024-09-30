import CircularProgress from "@mui/material/CircularProgress";
import { Box, SxProps } from "@mui/material";
import { FC } from "react";
/* interface ICustomStyles {
  position: string;
  top: string;
  left: string;
  transform: string;
  bgcolor: string;
  border: string;
  boxShadow: number;
  display: string;
  justifyContent: string;
  alignItems: string;
  columnGap: string;
} */
/* we have SxProps provided to us by the Material UI 
  we can use it when we need to create an object to be used as custom styles */
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
