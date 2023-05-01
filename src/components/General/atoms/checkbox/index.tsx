import { Checkbox } from "@chakra-ui/react";
import { BiCheckDouble } from "react-icons/bi";

interface Props {
  label: string;
  value?: string;
  onChange?: (e: any) => void;
}
export function CustomCheckbox(props: Props) {
  return (
    <Checkbox
      icon={<BiCheckDouble />}
      value={props.value}
      onChange={props.onChange}
    >
      {props.label}
    </Checkbox>
  );
}
