import { React } from "react";
import "./Dashboard.css";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = (props) => {
  let groups = props.groups;
  let user = props.user;
  let setEvent = props.setEvent;
  let setEvents = props.setEvents;
  const navigate = useNavigate();
  let events = props.events;
  const localizer = momentLocalizer(moment);

  const handleSelectEvent = (event) => {
    setEvent(event);
    navigate("/event", { state: { user: user } });
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

  const handleGetEvents = (event) => {
    axios
      .get(`/events/${user._id}/${event.target.value}`)
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
