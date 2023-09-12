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
    <div>
      <form></form>
      <div>Event Details</div>
      <div>Creator: {user.name}</div>
      <div>Title: {event.title}</div>
      <div>Content: {event.content}</div>
      <div>Start Date: {event.startDate}</div>
      <div>End Date: {event.endDate}</div>
      <div>Time: {event.time}</div>
      <div onClick={handleEditEvent}>Edit</div>
      <div onClick={handleDeleteEvent}>Delete</div>
    </div>
  );
}
export default ShowEvent;
