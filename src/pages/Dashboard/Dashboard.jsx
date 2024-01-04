import { useEffect, useState, React } from "react";
import "./Dashboard.css";
import moment from "moment";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user, setEvent }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState();
  const localizer = momentLocalizer(moment);
  let userEvents;

  const handleSelectEvent = (event) => {
    setEvent(event);
    navigate("/event", { state: { user: user } });
  };

  useEffect(() => {
    axios
      .get(`/events/${user._id}`)
      .then((response) => {
        userEvents = response.data;
        setEvents(userEvents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userEvents]);

  return (
    <div>
      <Calendar localizer={localizer} events={events} startAccessor="startDate" endAccessor="endDate" style={{ height: 900 }} onSelectEvent={handleSelectEvent} />
    </div>
  );
};
export default Dashboard;
