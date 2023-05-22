import Select, { StylesConfig } from "react-select";
import { useId } from "react";
interface OptionsType {
  label: string;
  value: string;
}
type IsMulti = false;

export function CustomSelect({
  options,
  onChange,
}: {
  options: OptionsType[];
  onChange: (value: any) => void;
}) {
  const customStyles: StylesConfig<OptionsType, IsMulti> = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      cursor: "pointer",
      color: state.isSelected ? "#fff" : "#555",
      backgroundColor: state.isSelected ? "#C8815F" : "none",
      ":hover": {
        color: state.isSelected ? "#fff" : "#111",
        backgroundColor: state.isSelected ? "#C8815F" : "#ddd",
      },
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#999",
      };
    },
    control: (defaultStyles, state) => ({
      ...defaultStyles,
      backgroundColor: "inherit",
      padding: "8px",

      border: state.isFocused ? "1px solid #C8815F" : "1px solid #eee",
      boxShadow: "none",
      borderRadius: "6px",
      ":hover": {
        borderColor: state.isFocused ? "#C8815F" : "#ddd",
      },
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#555" }),
  };

  return (
    <Select
      placeholder={"Select Country *"}
      options={options}
      styles={customStyles}
      onChange={onChange}
      instanceId={useId()}
      required
    />
  );
}
