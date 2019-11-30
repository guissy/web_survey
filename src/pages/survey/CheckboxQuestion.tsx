import React from "react";
import { QuestionItem } from "./index";

interface Props {
  parentId: string;
  question: QuestionItem;
}

const CheckboxQuestion: React.FC<Props> = ({ parentId, question }) => {
  const inputKey = (parentId + " " + question.title)
    .split(" ")
    .join("_")
    .toLocaleLowerCase();
  return (
    <div className="form-input form-component-checkboxgroup">
      <div className="form-group">
        <label htmlFor={inputKey} className="form-label">
          {question.title}
        </label>
        <div className="form-item-contents">
          <div className="form-item-input">
            <div>
              {question.options.map((label, i) => (
                <div key={i} className="form-check">
                  <input
                    name={inputKey}
                    type="checkbox"
                    id={inputKey + i}
                    className="form-check-input"
                    defaultValue="false"
                  />
                  <label htmlFor={inputKey + i} className="form-check-label">
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
