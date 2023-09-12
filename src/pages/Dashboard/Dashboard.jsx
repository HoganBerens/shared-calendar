import { useEffect, useState, React } from "react";
import "./Dashboard.css";
import moment from "moment";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const Dashboard = ({ user }) => {
  const [events, setEvents] = useState();
  const localizer = momentLocalizer(moment);
  let userEvents;

  useEffect(() => {
    axios
      .get(`/events/${user.userID}`)
      .then((response) => {
        userEvents = response.data;
        setEvents(userEvents);
        console.log(userEvents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userEvents]);

  return (
    <div>
      <Calendar localizer={localizer} events={events} startAccessor="startDate" endAccessor="endDate" style={{ height: 900 }} />
    </div>
  );
};
export default Dashboard;
