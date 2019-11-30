import React from "react";

interface Props {
  inputKey: string;
  label: string;
  description?: string;
}

const Input: React.FC<Props> = ({ inputKey, label, description }) => {
  return (
    <div className="form-input form-component-textarea">
      <div className="form-group">
        <label htmlFor={inputKey} className="form-label">
          {label}
        </label>
        <div className="form-item-contents">
          <div className="form-item-input">
            <textarea
              name={inputKey}
              id={inputKey}
              className="form-control"
              defaultValue={""}
            />
          </div>
          {description && (
            <small className="form-text">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <div>{description}</div>
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
