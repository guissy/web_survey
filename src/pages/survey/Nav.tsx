import React from "react";
import outline from "../data/outline";

interface Props {
  topicIndex: number;
  setTopicIndex: (i: number) => void;
}

const Nav: React.FC<Props> = ({ topicIndex, setTopicIndex }) => {
  return (
    <nav className="section-nav section-nav-hidden">
      <div className="section-nav-inner">
        <div className="section-nav-head">
          <h3 className="section-nav-heading">Table of Contents</h3>
          <span className="section-nav-toggle">▶</span>
        </div>
        <div className="section-nav-contents">
          <ul>
            {outline.map((v, i) => (
              <li key={v.title} className="section-nav-item">
                <a
                  className={i === topicIndex ? "active" : ""}
                  onClick={() => setTopicIndex(i)}
                  href={"#" + i}
                >
                  {v.title}
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
