import "./App.css";
import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import AuthPage from "../AuthPage/AuthPage";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import Dashboard from "../Dashboard/Dashboard";
import NewEvent from "../NewEvent/NewEvent";
import NewGroup from "../NewGroup/NewGroup";

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/newEvent" element={<NewEvent user={user} />} />
            <Route path="/newGroup" element={<NewGroup user={user} />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
