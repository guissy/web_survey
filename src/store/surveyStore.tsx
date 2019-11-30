import * as React from "react";
export interface SurveyValue {
  onChangeInput(data: object): void;
}
export const SurveyContext = React.createContext<SurveyValue>({
  onChangeInput: data => {}
} as SurveyValue);
export const {
  Provider: SurveyProvider,
  Consumer: SurveyConsumer
} = SurveyContext;
const initState = {};
type Action = { type: string; data: object };
const reducer = (prevState: {}, action: Action) => {
  switch (action.type) {
    case "ChangeInput":
      return { ...prevState, ...action.data };
    default:
      return prevState;
  }
};
const SurveyStore: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initState);
  const onChangeInput = React.useCallback(data => {
    dispatch({ type: "ChangeInput", data });
  }, []);
  const value = { state, onChangeInput };
  return <SurveyProvider value={value}>{children}</SurveyProvider>;
};

export default SurveyStore;
