import { Link } from "react-router-dom";
import { logOut } from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="/">Home</Link>&nbsp; | &nbsp;
      <Link to="/newEvent">New Event</Link>&nbsp; | &nbsp;
      <Link to="/groups">New Group</Link>&nbsp; | &nbsp;
      <span> Welcome, {user.name} to Shared Calendar!</span>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>
        Log Out
      </Link>
    </nav>
  );
}
