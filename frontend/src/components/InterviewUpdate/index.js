import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import axios from "axios";
import moment from "moment";
import "./style.css";
import { toast } from "react-toastify";

const InterviewUpdate = () => {
  const [interviewers, setInterviewers] = useState([]);
  const [interviewees, setInterviewees] = useState([]);
  const history = useHistory();
  // form data
  const { id } = useParams();
  const [interviewer, setInterviewer] = useState("");
  const [interviewee, setInterviewee] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const deleteInterview = async () => {
    try {
      const schedule = await axios.delete(
        `https://radiant-123.herokuapp.com/api/schedules/${id}`
      );

      if (schedule.status === 204) {
        toast.success("Deleted Succesfully");
        history.push("/");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const updateInterview = async () => {
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
      const schedule = await axios.patch(
        `https://radiant-123.herokuapp.com/api/schedules/${id}`,
        {
          interviewer,
          interviewee,
          start: new Date(start).toISOString(),
          end: new Date(end).toISOString(),
        }
      );
      if (schedule.data.status === "success") {
        toast.success("Updated Succesfully");
      } else {
        toast.error(schedule.data.message);
      }
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

  const getSchedule = async () => {
    const schedule = await axios.get(
      `https://radiant-123.herokuapp.com/api/schedules/${id}`
    );
    if (schedule.data.status === "success") {
      setInterviewer(schedule.data.schedule.interviewer._id);
      setInterviewee(schedule.data.schedule.interviewee._id);
      setStart(schedule.data.schedule.startAt);
      setEnd(schedule.data.schedule.endAt);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <div className="update_schedule_wrapper">
      <div className="update_schedule">
        <h4>Update Interview Schedule</h4>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Interviewer</Form.Label>
            <Select
              options={interviewers}
              value={interviewers.filter((el) => el.value === interviewer)}
              onChange={(e) => setInterviewer(e.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Interviewee</Form.Label>
            <Select
              options={interviewees}
              value={interviewees.filter((el) => el.value === interviewee)[0]}
              onChange={(e) => setInterviewee(e.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Start Time</Form.Label>
            <br />
            <input
              value={moment(start).format("yyyy-MM-DThh:mm")}
              type="datetime-local"
              id="starttime"
              onChange={(e) => setStart(e.target.value)}
            ></input>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Ending Time</Form.Label>
            <br />
            <input
              value={moment(end).format("yyyy-MM-DThh:mm")}
              type="datetime-local"
              id="endtime"
              onChange={(e) => setEnd(e.target.value)}
            ></input>
          </Form.Group>
          <div className="update_form_btns">
            <Button variant="info" onClick={updateInterview}>
              Update
            </Button>
            <Button variant="danger" onClick={deleteInterview}>
              Delete
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default InterviewUpdate;
