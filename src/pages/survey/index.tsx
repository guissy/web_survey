import React from "react";
import RadioQuestion from "./RadioQuestion";
import outline from "../data/outline";
import Nav from "./Nav";
import Footer from "./Footer";
import { getTemplateInput, getTemplateOptions } from "../data/templateUtil";
import Input from "./Input";
import CheckboxQuestion from "./CheckboxQuestion";

export interface Template {
  feature: GetFormItemOpt;
  pattern: GetFormItemOpt;
  tool: GetFormItemOpt;
  multiple: GetFormItemOpt;
  text: GetFormItemOpt;
  longtext: GetFormItemOpt;
  opinion: GetFormItemOpt;
  happiness: GetFormItemOpt;
}

export type QuestionType = RadioQuestionItem | QuestionItem | string;

export interface Topic {
  id: string;
  title: string;
  description: string;
  template: keyof Template;
  questions: QuestionType[];
}

export interface RadioQuestionItem {
  title: string;
  description: string;
}

export interface QuestionItem {
  title: string;
  description: string;
  template: string;
  allowmultiple: boolean;
  allowother: boolean;
  randomize: boolean;
  options: string[];
}

export type RadioOptionItem = { value: string; label: string };
export type QuestionOpt = {
  input: string;
  options: RadioOptionItem[];
};
type GetFormItemOpt = () => QuestionOpt;

const Index: React.FC<{}> = () => {
  const [topicIndex, setTopicIndex] = React.useState(0);
  const [btnKey, setBtnKey] = React.useState(0);
  const topic = outline[topicIndex] as Topic;

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const submit = React.useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBtnKey(Math.random());
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTo({ top: 0 });
  }, [topicIndex]);
  return (
    <div className="main-contents">
      <div className="survey-section">
        <Nav topicIndex={topicIndex} setTopicIndex={setTopicIndex} />
        <div className="section-contents">
          <div className="section-questions">
            <h2 className="section-title">{topic.title}</h2>
            <h3 className="section-description">{topic.description}</h3>
            <form className="document-edit" onSubmit={submit}>
              <div className="form-errors" />
              <div className="form-section form-section-default form-section-default">
                <div>
                  {topic.questions.map((question, i) => {
                    const input = getTemplateInput(question, topic);
                    if (input === "radiogroup")
                      return (
                        <RadioQuestion
                          key={topic.id + i}
                          options={getTemplateOptions(question, topic)}
                          parentId={topic.id}
                          question={question}
                        />
                      );
                    if (input === "checkboxgroup")
                      return (
                        <CheckboxQuestion
                          key={topic.id + i}
                          parentId={topic.id}
                          question={question as QuestionItem}
                        />
                      );
                    if (input === "text")
                      return (
                        <Input
                          key={topic.id + i}
                          inputKey={topic.id + i}
                          label={(question as RadioQuestionItem).title}
                          description={
                            (question as RadioQuestionItem).description
                          }
                        />
                      );
                    return "";
                  })}
                </div>
              </div>
              <Footer
                btnKey={btnKey}
                topicIndex={topicIndex}
                setTopicIndex={setTopicIndex}
                outline={outline as Topic[]}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
