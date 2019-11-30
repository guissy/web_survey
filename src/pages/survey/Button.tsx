import React from "react";

interface Props {
  btnKey: number;
  label: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ btnKey, label, onClick }) => {
  return (
    <button
      key={btnKey}
      type="submit"
      className="loading-button-notloading btn btn-primary"
      onClick={onClick}
    >
      <span style={{ position: "relative" }}>
        <span>{label}</span>
        <span style={{ display: "none" }}>
          <div className="spinner undefined">
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
          </div>
        </span>
      </span>
    </button>
  );
};

export default Button;
