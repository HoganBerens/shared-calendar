import { useEffect, useState, React } from "react";
import "./Dashboard.css";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Dashboard = ({ user }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`/events/${user.userID}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
    </div>
  );
};
export default Dashboard;
