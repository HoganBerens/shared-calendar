import "./EditEvent.css";
import axios from "axios";
import { config } from "../../utilities/configs";
import { useParams } from "react-router-dom";

function EditEvent(props) {
  let user = props.user;
  let selectedEvent = props.selectedEvent;
  let setSelectedEvent = props.setSelectedEvent;
  let { id } = useParams();

  const handleEditEvent = (event) => {
    event.preventDefault();
    axios
      .put(`/events/${id}/edit`, { title: event.target[0].value, content: event.target[1].value, startDate: event.target[2].value, endDate: event.target[3].value, time: event.target[4].value, user: user }, config)
      .catch((err) => {
        console.log(err);
      })

      .catch((error) => console.log(error));
    window.location.href = "/";
  };

  return (
    <div className="editEvent-wrapper">
      <div className="editEvent-container">
        <h1>Edit Event</h1>
        <form className="editEvent-form" onSubmit={handleEditEvent} action="/events/edit">
          <div>
            <input className="editEvent-input" type="text" name="title" placeholder="Event Title" />
            <input type="text" name="content" placeholder="Event Content" />
          </div>
          <div>
            <span>Start Date</span>
            <input className="editEvent-input" type="date" name="startdate" />
          </div>
          <div>
            <span>End Date</span>
            <input className="editEvent-input" type="date" name="enddate" />
          </div>
          <div>
            <span>Time</span>
            <input className="editEvent-input" type="time" name="time" />
          </div>
          <button className="editEvent-button" type="submit">
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
}
export default EditEvent;
