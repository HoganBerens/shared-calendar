import "./DeleteEvent.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function DeleteEvent(props) {
  let setSelectedEvent = props.setSelectedEvent;
  let selectedEvent = props.selectedEvent;
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
  useEffect(() => {
    axios
      .get(`/events/getOne/${id}`)
      .then((response) => {
        setSelectedEvent(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="deleteEvent-wrapper">
      {console.log(selectedEvent)}
      {selectedEvent && selectedEvent.event ? (
        <div className="deleteEvent-container">
          <div className="deleteEvent-item">Are you sure you want to delete event: {selectedEvent.event.title}</div>
          <div className="deleteEvent-button-container">
            <div className="deleteEvent-item" onClick={handleDeleteEvent}>
              Yes, Delete
            </div>
            <div className="deleteEvent-item" onClick={handleDontDelete}>
              No
            </div>
          </div>
        </div>
      ) : (
        <div>There was an issue, please return to Home</div>
      )}
    </div>
  );
}
export default DeleteEvent;
