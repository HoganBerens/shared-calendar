import { React, useContext } from "react";
import "./Dashboard.css";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

const Dashboard = (props) => {
  let groups = props.groups;
  let user = props.user;
  let setEvents = props.setEvents;
  let events = props.events;
  const localizer = momentLocalizer(moment);

  const handleSelectEvent = (e) => {
    window.location.href = `/event/${e._id}`;
  };

  const handleGetYourEvents = () => {
    axios
      .get(`/events/${user._id}`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGetEvents = (e) => {
    axios
      .get(`/events/${user._id}/${e.target.value}`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          {groups.length ? (
            <div style={{ display: "flex" }}>
              <div>Filter Events By Group</div>
              <select onChange={handleGetEvents}>
                <option placeholder="" hidden={true} />
                {groups.map((group, groupIndex) => (
                  <option key={groupIndex}>{group.title}</option>
                ))}
              </select>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <button onClick={handleGetYourEvents}>Show Your Events</button>
      </div>
      <Calendar localizer={localizer} events={events} startAccessor="startDate" endAccessor="endDate" style={{ height: 900 }} onSelectEvent={handleSelectEvent} />
    </div>
  );
};
export default Dashboard;
