import template from "./template";
import {
  QuestionItem,
  QuestionOpt,
  QuestionType,
  RadioOptionItem,
  Template,
  Topic
} from "../survey";

export function getTemplateOpt(
  question: QuestionType,
  topic: Topic
): QuestionOpt | null {
  const name =
    (question && (question as QuestionItem).template) || topic.template;
  const t = name as keyof Template;
  let questionOpt: QuestionOpt | null;
  if (Object.keys(template).includes(t)) {
    questionOpt = template[t](question as QuestionItem) as QuestionOpt;
  } else {
    questionOpt = null;
  }
  return questionOpt;
}

export function getTemplateInput(question: QuestionType, topic: Topic): string {
  const opt = getTemplateOpt(question, topic);
  if (opt) {
    return opt.input;
  } else {
    return "";
  }
}

export function getTemplateOptions(
  question: QuestionType,
  topic: Topic
): RadioOptionItem[] {
  const opt = getTemplateOpt(question, topic);
  if (opt && Array.isArray(opt.options)) {
    return opt.options;
  } else {
    let options = [] as RadioOptionItem[];
    const opts = (question as QuestionItem).options;
    if (Array.isArray(opts)) {
      options = opts.map(o => ({ value: o, label: o }));
    }
    return options;
  }
}
