import React from "react";
import { RadioOptionItem, RadioQuestionItem } from "./index";
import RadioOption from "./RadioOption";

interface Props {
  parentId: string;
  question: RadioQuestionItem | string;
  options: RadioOptionItem[];
}

const RadioQuestion: React.FC<Props> = ({ parentId, question, options }) => {
  const isQuestionObj = typeof question === "string";
  const title = isQuestionObj
    ? question
    : (question as RadioQuestionItem).title;
  const description = isQuestionObj
    ? ""
    : (question as RadioQuestionItem).description;
  const inputName = (parentId + " " + title)
    .split(" ")
    .join("_")
    .toLocaleLowerCase();
  return (
    <div>
      <div className="form-input input-syntax_destructuring form-component-radiogroup">
        <div className="form-group">
          <label htmlFor={inputName} className="form-label">
            {title}
          </label>
          <div className="form-item-contents">
            <div className="form-item-input">
              {options.map((option, index) => (
                <RadioOption
                  key={index}
                  name={inputName}
                  index={index}
                  defaultValue={option.value}
                  label={option.label}
                />
              ))}
            </div>
            {description && (
              <small className="form-text">
                <div>
                  Example: <code>{description}</code>
                </div>
              </small>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioQuestion;
