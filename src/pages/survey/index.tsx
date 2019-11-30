import React, { FormEvent } from "react";
import RadioQuestion from "./RadioQuestion";
import outline from "../../store/outline";
import Nav from "./Nav";
import Footer from "./Footer";
import {
  getQuestionName,
  getTemplateInput,
  getTemplateOptions
} from "../../store/templateUtil";
import Input from "./Input";
import CheckboxQuestion from "./CheckboxQuestion";
import { SurveyContext } from "../../store/surveyStore";

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
  const { onChangeInput } = React.useContext(SurveyContext);
  const [values, setValues] = React.useState(
    {} as { [k: string]: string | Set<string> }
  );
  const submit = React.useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setBtnKey(Math.random());
      onChangeInput(values);
    },
    [values]
  );
  React.useEffect(() => {
    document.documentElement.scrollTo({ top: 0 });
  }, [topicIndex]);
  const onChange = React.useCallback(
    (name, value) => setValues(values => ({ ...values, [name]: value })),
    []
  );
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
                          name={getQuestionName(question, topic.id)}
                          question={question}
                          value={
                            values[
                              getQuestionName(question, topic.id)
                            ] as string
                          }
                          onChange={onChange}
                        />
                      );
                    if (input === "checkboxgroup")
                      return (
                        <CheckboxQuestion
                          key={topic.id + i}
                          name={getQuestionName(question, topic.id)}
                          question={question as QuestionItem}
                          value={
                            values[getQuestionName(question, topic.id)] as Set<
                              string
                            >
                          }
                          onChange={onChange}
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
