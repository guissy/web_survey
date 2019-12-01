import * as React from "react";
export type SurveyState = { formValues: object };
const initState = { formValues: {} };
export const SurveyStateContext = React.createContext<SurveyState>(initState);
export const SurveyDispatchContext = React.createContext<Function>(() => {});
type Action = { type: string; data: object };

const reducer = (prevState: SurveyState, action: Action) => {
  switch (action.type) {
    case "ChangeInput":
      return {
        ...prevState,
        formValues: { ...prevState.formValues, ...action.data }
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const useSurveyState = () => React.useContext(SurveyStateContext);
export const useSurveyDispatch = () => React.useContext(SurveyDispatchContext);

const SurveyStore: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initState);
  return (
    <SurveyStateContext.Provider value={state}>
      <SurveyDispatchContext.Provider value={dispatch}>
        {children}
      </SurveyDispatchContext.Provider>
    </SurveyStateContext.Provider>
  );
};
export default SurveyStore;
