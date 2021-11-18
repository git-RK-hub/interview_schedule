import React from "react";
import InterviewSchedulesList from "../components/InterviewScheduleList";
import InterviewUpdate from "../components/InterviewUpdate";
import InterviewSchedule from "../components/InterviewSchedule";
import { Switch, Route } from "react-router-dom";
import "./style.css";

const Interview = () => {
  return (
    <div className="interview_container">
      <Switch>
        <Route exact path="/">
          <InterviewSchedulesList />
          <InterviewSchedule />
        </Route>
        <Route path="/edit/:id">
          <InterviewUpdate />
        </Route>
      </Switch>
    </div>
  );
};

export default Interview;
