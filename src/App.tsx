import React from "react";
import "./App.css";
import Survey from "./pages/survey";
import SurveyStore from "./store/surveyStore";
import Thank from "./pages/thank";
import { Router } from "@reach/router";

const App: React.FC = () => {
  return (
    <SurveyStore>
      <div className="main-contents">
        <Router>
          <Survey default />
          <Thank path="thank" />
        </Router>
      </div>
    </SurveyStore>
  );
};

export default App;
