import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  name: string;
  index: number;
  defaultValue: string;
  label: string;
  checked: boolean;
  onChange: (name: string, value: string) => void;
}

const RadioOption: React.FC<Props> = ({
  name,
  index,
  defaultValue,
  label,
  checked,
  onChange
}) => {
  return (
    <div className="form-check">
      <input
        name={name}
        type="radio"
        id={name + "." + index}
        className="form-check-input"
        defaultValue={defaultValue}
        checked={checked}
        onChange={() => onChange(name, defaultValue)}
      />
      <label htmlFor={name + "." + index} className="form-check-label">
        {label}
      </label>
    </div>
  );
};

export default RadioOption;
