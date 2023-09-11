import "./ShowGroup.css";
import { useState } from "react";
import { debounce } from "../../utilities/search-user";
import axios from "axios";

function ShowGroup({ group, setGroup }) {
  const [searchResults, setSearchResults] = useState([]);
  const [name, setName] = useState("");

  const handleSearchUsers = async (event) => {
    event.preventDefault();
    axios
      .get(`/api/users/search?name=${name}`)
      .then((response) => {
        if (response.data[0]) {
          setSearchResults(response.data);
          console.log(response.data);
        } else {
          setSearchResults({});
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAddToGroup = (user) => {
    user.groups.push(group);
    user.save();
    console.log(user);
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
            <div onClick={handleAddToGroup.bind(this, user)} key={index}>
              {user.name}
              Add to Group
            </div>
          ))}
        </div>
      ) : (
        <div>No Users Found</div>
      )}
      <button
        onClick={() => {
          setGroup({});
        }}
      >
        Create New Group
      </button>
    </div>
  );
}
export default ShowGroup;
