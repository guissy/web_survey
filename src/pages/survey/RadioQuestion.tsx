import React from "react";
import { RadioOptionItem, RadioQuestionItem } from "./index";
import RadioOption from "./RadioOption";
import { getQuestionTitle } from "../../store/templateUtil";

interface Props {
  name: string;
  value: string;
  question: RadioQuestionItem | string;
  options: RadioOptionItem[];
  onChange: (name: string, value: string) => void;
}

const RadioQuestion: React.FC<Props> = ({
  name,
  question,
  options,
  value,
  onChange
}) => {
  const isQuestionObj = typeof question === "string";
  const description = isQuestionObj
    ? ""
    : (question as RadioQuestionItem).description;
  return (
    <div className="form-input input-syntax_destructuring form-component-radiogroup">
      <div className="form-group">
        <label htmlFor={name} className="form-label">
          {getQuestionTitle(question)}
        </label>
        <div className="form-item-contents">
          <div className="form-item-input">
            {options.map((option, index) => (
              <RadioOption
                key={index}
                name={name}
                index={index}
                defaultValue={option.value}
                label={option.label}
                checked={value === option.value}
                onChange={onChange}
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
  );
};

export default RadioQuestion;
