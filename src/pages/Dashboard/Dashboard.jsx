import { useEffect, useState, React } from "react";
import "./Dashboard.css";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Dashboard = ({ user }) => {
  const [userEvents, setUserEvents] = useState([]);
  const [] = useState(false);

  useEffect(() => {
    axios
      .get(`/events/${user.userID}`)
      .then((response) => {
        setUserEvents(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={userEvents} />
    </div>
  );
};
export default Dashboard;
