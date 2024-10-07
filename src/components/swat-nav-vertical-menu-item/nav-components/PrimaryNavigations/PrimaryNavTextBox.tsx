import { FC } from "react";
import { Typography } from "@mui/material";

interface IPrimaryNavTextBoxProps {
  label: string;
}

const PrimaryNavTextBox: FC<IPrimaryNavTextBoxProps> = ({ label }) => {
  return (
    <Typography
      sx={{
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        fontWeight: "bold",
        fontSize: "14px",
        height: "35px",
        position: "relative",
        background: "transparent",
        color: "inherit",
      }}
    >
      {label}
    </Typography>
  );
};

export default PrimaryNavTextBox;
