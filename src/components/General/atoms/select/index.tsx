import Select, { StylesConfig } from "react-select";
import { useId } from "react";
import { SelectOptionsType } from "@/utils";

type IsMulti = false;

export function CustomSelect({
  options,
  onChange,
  placeholder,
  defaultValue,
}: {
  options: SelectOptionsType[];
  onChange: (value: any) => void;
  placeholder?: string;
  defaultValue?: SelectOptionsType;
}) {
  const customStyles: StylesConfig<SelectOptionsType, IsMulti> = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      zIndex: 500,
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
      zIndex: 500,

      border: state.isFocused ? "1px solid #C8815F" : "1px solid #eee",
      boxShadow: "none",
      borderRadius: "6px",
      ":hover": {
        borderColor: state.isFocused ? "#C8815F" : "#ddd",
      },
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#555" }),
    menu: (base) => ({
      ...base,
      // width: "max-content",
      // minWidth: "100%",
      zIndex: 9999,
    }),
  };

  return (
    <Select
      placeholder={placeholder ? placeholder : "Select Country *"}
      defaultValue={defaultValue}
      options={options}
      styles={customStyles}
      onChange={onChange}
      instanceId={useId()}
      required
    />
  );
}
