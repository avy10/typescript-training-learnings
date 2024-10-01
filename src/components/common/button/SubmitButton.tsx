import { FC, MouseEvent } from "react";

import Button from "@mui/material/Button";

interface SubmitButtonProps {
  btnText: string;
  btnSize?: "small" | "medium" | "large";
  btnVariant?: "text" | "outlined" | "contained";
  clickHandlerFunction?: () => void;
  loadingState?: boolean;
  loadingStateText?: string;
}

const SubmitButton: FC<SubmitButtonProps> = ({
  btnText,
  btnSize = "medium",
  btnVariant = "contained",
  clickHandlerFunction,
  loadingState = false,
  loadingStateText = "Loading",
}) => {
  console.log(clickHandlerFunction);
  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (clickHandlerFunction) {
      /* bcz clickHandlerFunction can be undefined, 
      we should check if it is present or not */
      clickHandlerFunction();
    }
  };

  return (
    <Button
      type="submit"
      onClick={clickHandlerFunction ? handleOnClick : undefined}
      variant={btnVariant}
      size={btnSize}
      disabled={loadingState}
    >
      {loadingState ? loadingStateText : btnText}{" "}
    </Button>
  );
};

export default SubmitButton;
