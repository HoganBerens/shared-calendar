import "./ShowGroup.css";
import { useState } from "react";
import { debounce } from "../../utilities/search-user";

function ShowGroup({ group, setGroup }) {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  let handleSearchUsers = debounce((event) => {
    if (event.target.value) {
      fetch(`/api/users/search/${event.target.value}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.results) {
            setSearchResults(data.results);
            setHasSearched(true);
          }
        })
        .catch((err) => console.error(err));
    } else {
      setHasSearched(false);
      setSearchResults([]);
    }
  }, 1000);

  return (
    <div>
      <div>Group: {group.title}</div>
      <div>Add Users to Group</div>
      <form>
        <input type="text" onChange={handleSearchUsers} />
      </form>
      <div>Search Results: {searchResults}</div>
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
