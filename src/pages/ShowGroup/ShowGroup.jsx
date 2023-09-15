import "./ShowGroup.css";
import { useState } from "react";
import axios from "axios";
import { config } from "../../utilities/configs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";

function ShowGroup() {
  const [searchResults, setSearchResults] = useState([]);
  const [name, setName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const selectedGroup = location.state.group;
  selectedGroup.users.newUser && selectedGroup.users.prevUsers.push(selectedGroup.users.newUser);
  const users = selectedGroup.users.prevUsers;
  console.log(users);

  console.log(users);
  let { id } = useParams();

  const handleSearchUsers = async (event) => {
    event.preventDefault();
    axios
      .get(`/api/users/search?name=${name}`)
      .then((response) => {
        if (response.data[0]) {
          setSearchResults(response.data);
        } else {
          setSearchResults({});
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAddToGroup = (user) => {
    axios
      .put(`/groups/${id}/addUser`, { user: user, users: users }, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
    navigate(-1);
  };

  return (
    <div>
      <div>Group: {selectedGroup.title}</div>
      <div>Owner: {selectedGroup.user.name}</div>
      <div>
        Members:
        {selectedGroup.users.prevUsers.length ? selectedGroup.users.prevUsers.map((user, index) => <div key={index}>{}</div>) : <div>No Users Yet</div>}
      </div>
      <div>Add Users to Group</div>
      <form onSubmit={handleSearchUsers}>
        <input placeholder="Seach for a user by name" type="text" onChange={(e) => setName(e.target.value)} />
        <button type="submit">Add User</button>
      </form>
      {searchResults.length ? (
        <div>
          {searchResults.map((user, index) => (
            <div key={index} onClick={handleAddToGroup.bind(this, user)}>
              {user.name}
            </div>
          ))}
        </div>
      ) : (
        <div>No Users Found</div>
      )}
    </div>
  );
}
export default ShowGroup;
