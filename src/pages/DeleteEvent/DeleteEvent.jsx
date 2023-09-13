import "./DeleteEvent.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

function DeleteEvent({ event }) {
  let { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteEvent = (e) => {
    e.preventDefault();
    axios.delete(`/events/${id}/delete`);
    navigate(`/`);
  };

  const handleDontDelete = () => {
    navigate(-1);
  };

  return (
    <div className="deleteEvent-wrapper">
      <div className="deleteEvent-container">
        <div className="deleteEvent-item">Are you sure you want to delete event: {event.title}</div>
        <div className="deleteEvent-button-container">
          <div className="deleteEvent-item" onClick={handleDeleteEvent}>
            Yes, Delete
          </div>
          <div className="deleteEvent-item" onClick={handleDontDelete}>
            No
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeleteEvent;
