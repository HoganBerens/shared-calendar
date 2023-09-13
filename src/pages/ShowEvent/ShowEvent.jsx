import "./ShowEvent.css";
import { useLocation, useNavigate } from "react-router-dom";

function ShowEvent({ event, setEvent }) {
  const location = useLocation();
  let user = location.state.user;
  const navigate = useNavigate();

  const handleEditEvent = () => {
    setEvent(event);
    navigate(`/events/${event._id}/edit`, { state: { user: user } });
  };

  const handleDeleteEvent = () => {
    setEvent(event);
    navigate(`/events/${event._id}/delete`);
  };

  return (
    <div className="showEvent-wrapper">
      <h1>Event Details</h1>
      <div className="showEvent-container">
        <div className="showEvent-item-wrapper">
          <div className="showEvent-item">Creator: {user.name}</div>
          <div className="showEvent-item">Title: {event.title}</div>
        </div>
        <div className="showEvent-item-wrapper">
          <div className="showEvent-item">Content: {event.content}</div>
        </div>
        <div className="showEvent-item-wrapper">
          <div className="showEvent-item">Start Date: {event.startDate}</div>
          <div className="showEvent-item">End Date: {event.endDate}</div>
        </div>
        <div className="showEvent-item-wrapper">
          <div className="showEvent-item">Time: {event.time}</div>
        </div>
        <div className="showEvent-item-wrapper">
          <div className="showEvent-item" onClick={handleEditEvent}>
            Edit
          </div>
          <div className="showEvent-item" onClick={handleDeleteEvent}>
            Delete
          </div>
        </div>
      </div>
    </div>
  );
}
export default ShowEvent;
