import React from "react";
import { Link } from "@reach/router";

const Thank: React.FC<{ path: string }> = ({}) => {
  return (
    <div className="contents-narrow thanks">
      <p>Thanks for filling out the survey!</p>
      <p>
        Your data is saved. You can review or modify it until the survey closes.
      </p>
      <p>
        {"Also, you can help us get the word out by sharing this survey. " +
          "Every bit counts, and it'll help make our data even more representative:"}
      </p>
      <p>
        <Link to="survey">Back</Link>
      </p>
    </div>
  );
};

export default Thank;
