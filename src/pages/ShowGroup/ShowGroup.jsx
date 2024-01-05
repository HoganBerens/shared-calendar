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
  let selectedGroup = location.state.group;
  let selectedUser = location.state.user;
  let groupUsers = location.state.users;
  let navigate = useNavigate();

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

  const getGroup = (group) => {
    axios.get(`/groups/${group._id}/show`).then((response) => {
      selectedGroup = response;
    });
  };

  const handleAddToGroup = (user, group, groupUsers, event) => {
    axios.put(
      `/groups/${id}/addUser`,
      {
        user: user._id,
        group: group._id,
        users: groupUsers,
      },
      config
    );
    navigate(`/groups`);
  };

  return (
    <div className="showGroup-wrapper">
      <div className="showGroup-container">
        <div className="showGroup-title">Group Details</div>
        <div>Group: {selectedGroup.title}</div>
        <div>Owner: {selectedUser.name}</div>
        <div>Date Created: {selectedGroup.createdAt.split("T")[0]}</div>
        <div>
          Members:
          {groupUsers.length ? groupUsers.map((user, index) => <div key={index}>{user.name}</div>) : <div>No Users in Group</div>}
        </div>
        <div>Add Users to Group</div>
        <form onSubmit={handleSearchUsers}>
          <input placeholder="Seach for a user by name" type="text" onChange={(e) => setName(e.target.value)} />
          <button type="submit">Search</button>
        </form>
        {searchResults.length ? (
          <div>
            {searchResults.map((user, index) => (
              <div key={index} onClick={handleAddToGroup.bind(this, user, selectedGroup, groupUsers)}>
                {user.name}
              </div>
            ))}
          </div>
        ) : (
          <div>No Users Found</div>
        )}
      </div>
    </div>
  );
}
export default ShowGroup;
