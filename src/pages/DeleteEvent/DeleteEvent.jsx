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
    <div>
      Are you sure you want to delete event: {event.title}
      <div onClick={handleDeleteEvent}>Yes, Delete</div>
      <div onClick={handleDontDelete}>No</div>
    </div>
  );
}
export default DeleteEvent;
