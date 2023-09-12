import "./ShowGroup.css";
import { useState } from "react";
import axios from "axios";
import { config } from "../../utilities/configs";
import "react-big-calendar/lib/css/react-big-calendar.css";

function ShowGroup({ group }) {
  const [searchResults, setSearchResults] = useState([]);
  const [name, setName] = useState("");

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

  const handleAddToGroup = (event, user, group) => {
    event.preventDefault();
    axios
      .post("/api/users/addToGroup", { user: user, group: group }, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div>Group: {group.title}</div>
      <div>Add Users to Group</div>
      <form onSubmit={handleSearchUsers}>
        <input placeholder="Seach for a user by name" type="text" onChange={(e) => setName(e.target.value)} />
        <button type="submit">Add User</button>
      </form>
      {searchResults.length ? (
        <div>
          {searchResults.map((user, index) => (
            <form onSubmit={handleAddToGroup.bind(user)} action="/groups/addUsers">
              <div>{user.name}</div>
              <button type="submit">Add To Group</button>
            </form>
          ))}
        </div>
      ) : (
        <div>No Users Found</div>
      )}
    </div>
  );
}
export default ShowGroup;
