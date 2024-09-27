import React from "react";
import Button from "@mui/material/Button";

interface ButtonMUIProps {
  btnText: string;
  eventHandler: () => void;
  btnSize?: "small" | "medium" | "large";
  btnVariant?: "text" | "outlined" | "contained";
}

const ButtonMUI: React.FC<ButtonMUIProps> = ({
  btnText,
  eventHandler,
  btnSize = "medium",
  btnVariant = "contained",
}) => {
  return (
    <Button onClick={eventHandler} variant={btnVariant} size={btnSize}>
      {btnText}
    </Button>
  );
};

export default ButtonMUI;
