import "./NewEvent.css";
import axios from "axios";
import { useState } from "react";

const NewEvent = ({ user }) => {
  const Event_BASE_URL = "/newEvent";
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleNewEvent = (event) => {
    event.preventDefault();

    axios
      .post(Event_BASE_URL, { title: event.target[0].value, content: event.target[1].value, date: event.target[2].value, user: user }, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div>New Event</div>
      <form onSubmit={handleNewEvent} action="/events">
        <input type="text" name="title" placeholder="Event Title" />
        <input type="text" name="content" placeholder="Event Content" />
        <input type="date" name="date" />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};
export default NewEvent;
