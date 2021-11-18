import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import axios from "axios";
import "./style.css";
import { toast } from "react-toastify";

const InterviewSchedule = () => {
  const [interviewers, setInterviewers] = useState([]);
  const [interviewees, setInterviewees] = useState([]);

  // form data

  const [interviewer, setInterviewer] = useState("");
  const [interviewee, setInterviewee] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const scheduleInterview = async () => {
    if (!interviewer) {
      toast.error("Please Select Interviewer");
      return;
    }
    if (!interviewee) {
      toast.error("Please Select Interviewee");
      return;
    }
    if (!start) {
      toast.error("Please Select Start Time");
      return;
    }
    if (!end) {
      toast.error("Please Select End Time");
      return;
    }
    try {
      const schedule = await axios.post(
        "https://radiant-123.herokuapp.com/api/schedules",
        {
          interviewer,
          interviewee,
          start: new Date(start).toISOString(),
          end: new Date(end).toISOString(),
        }
      );

      if (schedule.data.status === "success")
        toast.success("Interview Scheduled Succesfully");
      if (schedule.data.status === "fail") toast.error(schedule.data.message);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const getUsers = async () => {
    const users = await axios.get(
      "https://radiant-123.herokuapp.com/api/users"
    );
    if (users.data.status === "success") {
      const interviewers = users.data.users
        .filter((el) => el.role === "interviewer")
        .map((el) => {
          const obj = {
            value: el._id,
            label: el.name,
          };
          return obj;
        });
      const interviewees = users.data.users
        .filter((el) => el.role === "interviewee")
        .map((el) => {
          const obj = {
            value: el._id,
            label: el.name,
          };
          return obj;
        });

      setInterviewers(() => interviewers);
      setInterviewees(() => interviewees);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="schedule_interview">
      <div className="schedule_form">
        <h4>Schedule Interview</h4>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Interviewer</Form.Label>
            <Select
              options={interviewers}
              onChange={(e) => setInterviewer(e.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Interviewee</Form.Label>
            <Select
              options={interviewees}
              onChange={(e) => setInterviewee(e.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Start Time</Form.Label>
            <br />
            <input
              type="datetime-local"
              id="starttime"
              onChange={(e) => setStart(e.target.value)}
            ></input>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Ending Time</Form.Label>
            <br />
            <input
              type="datetime-local"
              id="endtime"
              onChange={(e) => setEnd(e.target.value)}
            ></input>
          </Form.Group>
          <Button variant="info" onClick={scheduleInterview}>
            Schedule
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default InterviewSchedule;
