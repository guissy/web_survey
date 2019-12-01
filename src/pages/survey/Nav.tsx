import React from "react";
import outline from "../../store/outline";

interface Props {
  topicIndex: number;
  setTopicIndex: (i: number) => void;
  formValues: object;
}

const Nav: React.FC<Props> = ({ topicIndex, setTopicIndex, formValues }) => {
  const outlineOk = outline.map(topic => {
    const keys = Object.keys(formValues).filter(key =>
      key.startsWith(topic.id)
    );
    const finished = (keys.length / topic.questions.length) * 100;
    return { ...topic, finished };
  });
  return (
    <nav className="section-nav section-nav-hidden">
      <div className="section-nav-inner">
        <div className="section-nav-head">
          <h3 className="section-nav-heading">Table of Contents</h3>
          <span className="section-nav-toggle">▶</span>
        </div>
        <div className="section-nav-contents">
          <ul>
            {outlineOk.map((topic, i) => (
              <li key={topic.title} className="section-nav-item">
                <a
                  className={i === topicIndex ? "active" : ""}
                  onClick={() => setTopicIndex(i)}
                  href={"#" + i}
                >
                  {topic.title}
                  {topic.finished > 0 && (
                    <span className="section-nav-item-completion">
                      {" "}
                      {topic.finished.toFixed(0)}%
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
          <p className="completion-message">
            Note: all questions are optional, reaching 100% completion is not
            required.
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
