import "./EditEvent.css";
import axios from "axios";
import { config } from "../../utilities/configs";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditEvent({ user }) {
  let { id } = useParams();
  let navigate = useNavigate();

  const handleEditEvent = (event) => {
    event.preventDefault();
    axios
      .put(`/events/${id}/edit`, { title: event.target[0].value, content: event.target[1].value, startDate: event.target[2].value, endDate: event.target[3].value, time: event.target[4].value, user: user }, config)
      .then((response) => {})
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
    navigate("/");
  };

  return (
    <div>
      <h1>Edit Event</h1>
      <form className="newEvent-form" onSubmit={handleEditEvent} action="/events/edit">
        <input type="text" name="title" placeholder="Event Title" />
        <input type="text" name="content" placeholder="Event Content" />
        <span>Start Date</span>
        <input type="date" name="startdate" />
        <span>End Date</span>
        <input type="date" name="enddate" />
        <input type="time" name="time" />
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
}
export default EditEvent;
