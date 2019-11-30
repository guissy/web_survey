import React from "react";
import "./App.css";
import Survey from "./pages/survey/index";
import SurveyStore from "./store/surveyStore";

const App: React.FC = () => {
  return (
    <SurveyStore>
      <Survey />
    </SurveyStore>
  );
};

export default App;
