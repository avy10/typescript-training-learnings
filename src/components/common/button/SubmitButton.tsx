import { FC } from "react";

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
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (clickHandlerFunction) {
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
