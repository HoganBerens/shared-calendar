import { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("/events")
      .then((response) => {
        setEvents(response.body);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [events]);

  return (
    <div>
      <div>Good Morning</div>
      <div>Welcome To it</div>
    </div>
  );
};
export default Dashboard;
