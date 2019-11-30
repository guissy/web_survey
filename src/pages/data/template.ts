import { QuestionItem } from "../survey";

const template = {
  feature: () => ({
    input: "radiogroup",
    options: [
      {
        value: "neverheard",
        label: "🤷 Never heard of it/Not sure what it is"
      },
      {
        value: "heard",
        label: "✅ Know what it is, but haven't used it"
      },
      {
        value: "used",
        label: "👍 I've used it"
      }
    ]
  }),
  pattern: () => ({
    input: "radiogroup",
    options: [
      {
        value: "use_never",
        label: "Almost always avoid"
      },
      {
        value: "use_sparingly",
        label: "Use sparingly"
      },
      {
        value: "use_neutral",
        label: "Neutral"
      },
      {
        value: "use_frequently",
        label: "Use frequently"
      },
      {
        value: "use_always",
        label: " Use as much as I can"
      }
    ]
  }),
  tool: () => ({
    input: "radiogroup",
    options: [
      {
        value: "neverheard",
        label: "🤷 Never heard of it/Not sure what it is"
      },
      {
        value: "interested",
        label: "✅ Heard of it > Would like to learn"
      },
      {
        value: "not_interested",
        label: "🚫 Heard of it > Not interested"
      },
      {
        value: "would_use_again",
        label: "👍 Used it > Would use again"
      },
      {
        value: "would_not_use_again",
        label: "👎 Used it > Would avoid"
      }
    ]
  }),
  multiple: (e?: QuestionItem) => {
    const { allowmultiple: a } = e || {};
    return {
      input: a ? "checkboxgroup" : "radiogroup"
    };
  },
  text: () => ({
    input: "text"
  }),
  longtext: () => ({
    input: "textarea"
  }),
  email: () => ({
    input: "email"
  }),
  opinion: () => ({
    input: "radiogroup",
    type: Number,
    options: [
      {
        value: 0,
        label: "Disagree Strongly"
      },
      {
        value: 1,
        label: "Disagree"
      },
      {
        value: 2,
        label: "Neutral"
      },
      {
        value: 3,
        label: "Agree"
      },
      {
        value: 4,
        label: "Agree Strongly"
      }
    ]
  }),
  happiness: () => ({
    input: "radiogroup",
    type: Number,
    options: [
      {
        value: 0,
        label: "Very Unhappy"
      },
      {
        value: 1,
        label: "Unhappy"
      },
      {
        value: 2,
        label: "Neutral"
      },
      {
        value: 3,
        label: "Happy"
      },
      {
        value: 4,
        label: "Very Happy"
      }
    ]
  })
} as const;
export default template;
