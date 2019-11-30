import * as React from "react";
export type SurveyValue = {};
export const SurveyStateContext = React.createContext<SurveyValue>({});
export const SurveyDispatchContext = React.createContext<Function>(() => {});

const initState = {};
type Action = { type: string; data: object };

const reducer = (prevState: {}, action: Action) => {
  switch (action.type) {
    case "ChangeInput":
      return { ...prevState, ...action.data };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const useSurveyState = () => React.useContext(SurveyStateContext);
export const useSurveyDispatch = () => React.useContext(SurveyDispatchContext);

const SurveyStore: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initState);
  const value = { state };
  return (
    <SurveyStateContext.Provider value={value}>
      <SurveyDispatchContext.Provider value={dispatch}>
        {children}
      </SurveyDispatchContext.Provider>
    </SurveyStateContext.Provider>
  );
};
export default SurveyStore;
