import "./App.css";
import { useState, useEffect, React, createContext } from "react";
import NavBar from "../../components/NavBar/NavBar";
import AuthPage from "../AuthPage/AuthPage";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import Dashboard from "../Dashboard/Dashboard";
import NewEvent from "../NewEvent/NewEvent";
import NewGroup from "../NewGroup/NewGroup";
import ShowGroup from "../ShowGroup/ShowGroup";
import ShowEvent from "../ShowEvent/ShowEvent";
import EditEvent from "../EditEvent/EditEvent";
import DeleteEvent from "../DeleteEvent/DeleteEvent";
import axios from "axios";

export default function App() {
  const [events, setEvents] = useState();
  const [user, setUser] = useState(getUser());
  const [group, setGroup] = useState();
  const [groups, setGroups] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    user &&
      axios
        .get(`/events/${user._id}`)
        .then((response) => {
          setEvents(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [user]);

  useEffect(() => {
    user &&
      axios
        .get(`/groups/${user._id}`)
        .then((response) => {
          setGroups(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [user]);

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Dashboard user={user} events={events} setSelectedEvent={setSelectedEvent} selectedEvent={selectedEvent} groups={groups} setEvents={setEvents} />} />
            <Route path="/newEvent" element={<NewEvent setEvents={setEvents} groups={groups} user={user} />} />
            <Route path="/event/:id" element={<ShowEvent selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} user={user} groups={groups} />} />
            <Route path="/events/:id/edit" element={<EditEvent user={user} setSelectedEvent={setSelectedEvent} selectedEvent={selectedEvent} />} />
            <Route path="/events/:id/delete" element={<DeleteEvent user={user} setSelectedEvent={setSelectedEvent} selectedEvent={selectedEvent} />} />
            <Route path="/groups" element={<NewGroup user={user} setGroup={setGroup} groups={groups} setGroups={setGroups} userGroups={userGroups} setUserGroups={setUserGroups} />} />
            <Route path="/groups/:id" element={<ShowGroup user={user} group={group} />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
