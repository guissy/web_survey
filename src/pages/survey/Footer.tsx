import React from "react";
import Button from "./Button";
import { Topic } from "./index";

interface Props {
  btnKey: number;
  topicIndex: number;
  setTopicIndex: (index: number) => void;
  outline: Topic[];
}

const Footer: React.FC<Props> = ({
  btnKey,
  topicIndex,
  setTopicIndex,
  outline
}) => {
  const topicPrev = outline[topicIndex - 1];
  const topicNext = outline[topicIndex + 1];
  return (
    <div className="form-submit form-section-nav form-section-nav-bottom">
      <div className="form-submit-actions">
        {topicIndex > 0 ? (
          <Button
            btnKey={btnKey + 1}
            label={`« ${topicPrev && topicPrev.title}`}
            onClick={() => setTopicIndex(topicIndex - 1)}
          />
        ) : (
          <div className="prev-placeholder" />
        )}

        {topicIndex !== outline.length - 1 && (
          <Button
            btnKey={btnKey - 1}
            label={`${topicNext && topicNext.title} »`}
            onClick={() => setTopicIndex(topicIndex + 1)}
          />
        )}
        {topicIndex === outline.length - 1 && (
          <Button
            btnKey={btnKey - 1}
            label={`Finish Survey »`}
            onClick={() => alert("谢谢")}
          />
        )}
      </div>
      <div className="form-submit-help">
        Your data is saved whenever you navigate to the previous or next
        section.
      </div>
    </div>
  );
};

export default Footer;
