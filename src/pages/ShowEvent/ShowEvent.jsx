import { useParams } from "react-router-dom";
import "./ShowEvent.css";
import axios from "axios";
import { useEffect } from "react";

function ShowEvent(props) {
  let selectedEvent = props.selectedEvent;
  let setSelectedEvent = props.setSelectedEvent;
  let groups = props.groups;

  let { id } = useParams();

  const handleEditEvent = () => {
    window.location.href = `/events/${selectedEvent.event._id}/edit`;
  };

  const handleDeleteEvent = () => {
    window.location.href = `/events/${selectedEvent.event._id}/delete`;
  };
  const handleSelectGroup = (e) => {
    axios.put(`/groups/addEvent/${e.target.value}`, { event: selectedEvent.event._id }).catch((err) => {
      console.log(err);
    });
    window.location.href = "/";
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
    <div className="showEvent-wrapper">
      <h1>Event Details</h1>
      {selectedEvent && selectedEvent.user && selectedEvent.event ? (
        <div className="showEvent-container">
          <div className="showEvent-item-wrapper">
            <div className="showEvent-item">Creator: {selectedEvent.user.name}</div>
            <div className="showEvent-item">Title: {selectedEvent.event.title}</div>
          </div>
          <div className="showEvent-item-wrapper">
            <div className="showEvent-item">Content: {selectedEvent.event.content}</div>
          </div>
          <div className="showEvent-item-wrapper">
            <div className="showEvent-item">Start Date: {selectedEvent.event.startDate}</div>
            <div className="showEvent-item">End Date: {selectedEvent.event.endDate}</div>
          </div>
          <div className="showEvent-item-wrapper">
            <div className="showEvent-item">Time: {selectedEvent.event.time}</div>
          </div>
          {groups.length ? (
            <div>
              <span>Add to Group</span>
              <select onChange={handleSelectGroup}>
                <option placeholder="" hidden={true} />
                {groups.map((group, groupIndex) => (
                  <option key={groupIndex}>{group.title}</option>
                ))}
              </select>
            </div>
          ) : (
            <div></div>
          )}
          <div className="showEvent-item-wrapper">
            <div className="showEvent-item" onClick={handleEditEvent}>
              Edit
            </div>
            <div className="showEvent-item" onClick={handleDeleteEvent}>
              Delete
            </div>
          </div>
        </div>
      ) : (
        <div>there was an issue getting the event</div>
      )}
    </div>
  );
}
export default ShowEvent;
