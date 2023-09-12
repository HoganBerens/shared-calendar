import "./ShowEvent.css";
import { useLocation } from "react-router-dom";
import moment from "moment";

function ShowEvent() {
  const location = useLocation();
  let user = location.state.user;
  let event = location.state.event;

  return (
    <div>
      <div>Event Details</div>
      <div>Creator: {user.name}</div>
      <div>Title: {event.title}</div>
      <div>Content: {event.content}</div>
      <div>Start Date: {event.startDate}</div>
      <div>End Date: {event.endDate}</div>
      <div>Time: {event.time}</div>
    </div>
  );
}
export default ShowEvent;
