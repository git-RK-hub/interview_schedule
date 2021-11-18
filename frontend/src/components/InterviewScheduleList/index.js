import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";

const InterviewSchedulesList = () => {
  const [list, setList] = useState([]);

  const getSchedules = async () => {
    const scheduleList = await axios.get(
      "https://radiant-123.herokuapp.com/api/schedules"
    );

    if (scheduleList.data.status === "success") {
      setList((list) => scheduleList.data.schedules);
    }
  };

  useEffect(() => {
    getSchedules();
  }, []);

  return (
    <div className="schedule_list_wrapper">
      <div className="schedule_list">
        <div className="schedule_list_head">
          <h4>Upcoming Interviews</h4>
        </div>
        <div className="schedule_list_list">
          <ul>
            {list.length < 1 ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              list.map((el) => {
                return (
                  <Link
                    key={el._id}
                    to={`/edit/${el._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <li key={el._id}>
                      Start Time: {moment(el.startAt).format("LLL")}
                      <br />
                      End Time: {moment(el.endAt).format("LLL")}
                    </li>
                  </Link>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InterviewSchedulesList;
