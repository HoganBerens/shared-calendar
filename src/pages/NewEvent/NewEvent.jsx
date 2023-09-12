import "./NewEvent.css";
import axios from "axios";
import { config } from "../../utilities/configs";
import { useNavigate } from "react-router-dom";

const NewEvent = ({ user }) => {
  const Event_BASE_URL = "/newEvent";
  const navigate = useNavigate();

  const handleNewEvent = (event) => {
    event.preventDefault();
    axios.post(Event_BASE_URL, { title: event.target[0].value, content: event.target[1].value, startDate: event.target[2].value, endDate: event.target[3].value, time: event.target[4].value, user: user }, config).catch((error) => console.log(error));
    navigate(`/`);
  };

  return (
    <div className="newEvent-container">
      <h1>New Event</h1>
      <form className="newEvent-form" onSubmit={handleNewEvent} action="/events">
        <input type="text" name="title" placeholder="Event Title" />
        <input type="text" name="content" placeholder="Event Content" />
        <span>Start Date</span>
        <input type="date" name="startdate" />
        <span>End Date</span>
        <input type="date" name="enddate" />
        <input type="time" name="time" />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};
export default NewEvent;
