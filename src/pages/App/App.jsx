import "./App.css";
import { useState } from "react";
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

export default function App() {
  const [user, setUser] = useState(getUser());
  const [group, setGroup] = useState();
  const [event, setEvent] = useState();
  const [userGroups, setUserGroups] = useState([]);

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Dashboard user={user} setEvent={setEvent} />} />
            <Route path="/newEvent" element={<NewEvent user={user} />} />
            <Route path="/event" element={<ShowEvent event={event} setEvent={setEvent} />} />
            <Route path="/events/:id/edit" element={<EditEvent user={user} setEvent={setEvent} event={event} />} />
            <Route path="/events/:id/delete" element={<DeleteEvent user={user} setEvent={setEvent} event={event} />} />
            <Route path="/groups" element={<NewGroup user={user} setGroup={setGroup} userGroups={userGroups} setUserGroups={setUserGroups} />} />
            <Route path="/groups/:id" element={<ShowGroup user={user} group={group} />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
