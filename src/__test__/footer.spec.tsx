import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import Footer from "../pages/survey/Footer";

test("renders Finish Survey", () => {
  const { getByText } = render(
    <Footer
      outline={[{ id: "a", title: "i am a title", questions: [] }]}
      btnKey={1}
      topicIndex={0}
      setTopicIndex={() => {}}
    />
  );
  getByText("Finish Survey »");
});

test("click next, show prev button", () => {
  let topicIndex = 0;
  const outline = [
    { id: "a", title: "im a title", questions: [] },
    { id: "b", title: "im b title", questions: [] }
  ];
  const { getByText, rerender } = render(
    <Footer
      outline={outline}
      btnKey={1}
      topicIndex={topicIndex}
      setTopicIndex={n => {
        topicIndex = n;
      }}
    />
  );
  getByText(/im b title/);
  const button = getByText(/»/i);
  fireEvent.click(button);
  rerender(
    <Footer
      outline={outline}
      btnKey={1}
      topicIndex={topicIndex}
      setTopicIndex={n => {
        topicIndex = n;
      }}
    />
  );
  getByText(/im a title/i);
});
