import React from "react";
import { QuestionItem } from "./index";

interface Props {
  name: string;
  question: QuestionItem;
  onChange: (name: string, value: Set<string>) => void;
  value: Set<string>;
}

const CheckboxQuestion: React.FC<Props> = ({
  name,
  question,
  value,
  onChange
}) => {
  const valueOk = value || new Set<string>();
  return (
    <div className="form-input form-component-checkboxgroup">
      <div className="form-group">
        <label htmlFor={name} className="form-label">
          {question.title}
        </label>
        <div className="form-item-contents">
          <div className="form-item-input">
            <div>
              {question.options.map((label, i) => (
                <div key={i} className="form-check">
                  <input
                    name={name}
                    type="checkbox"
                    id={name + i}
                    className="form-check-input"
                    defaultValue="false"
                    checked={valueOk.has(label)}
                    onChange={() => {
                      valueOk.add(label);
                      onChange(name, new Set(valueOk));
                    }}
                  />
                  <label htmlFor={name + i} className="form-check-label">
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {question.description && (
            <small className="form-text">
              <div>{question.description}</div>
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckboxQuestion;
