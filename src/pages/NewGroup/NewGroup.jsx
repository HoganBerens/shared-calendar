import "./NewGroup.css";
import axios from "axios";
import { config } from "../../utilities/configs";

const NewGroup = ({ user }) => {
  const Group_BASE_URL = "/newGroup";

  const handleNewGroup = (event) => {
    event.preventDefault();
    axios
      .post(Group_BASE_URL, { title: event.target[0].value, user: user }, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div>Good Morning</div>
      <form onSubmit={handleNewGroup} action="/groups">
        <input type="text" name="title" placeholder="Group Title" />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};
export default NewGroup;
