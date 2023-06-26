import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IoChevronBackOutline } from "react-icons/io5";

export function GoBack({
  children,
  onClick,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      color={"outly.black500"}
      fontWeight={400}
      p={"0px"}
      variant="ghost"
      onClick={() => {
        window.history.go(-1);
        onClick && onClick();
      }}
      leftIcon={<IoChevronBackOutline fontSize={"24px"} />}
    >
      {children ? children : " "}
    </Button>
  );
}
