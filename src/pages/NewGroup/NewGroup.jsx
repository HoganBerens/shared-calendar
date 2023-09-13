import "./NewGroup.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../utilities/configs";

const NewGroup = ({ user, setGroup, group }) => {
  const [userGroups, setUserGroups] = useState([]);

  const Group_BASE_URL = "/groups";

  const handleNewGroup = (event) => {
    event.preventDefault();
    axios
      .post(Group_BASE_URL, { title: event.target[0].value, user: user }, config)
      .then((response) => {
        setUserGroups(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`/groups/${user.userID}`)
      .then((response) => {
        setGroup({});
        setUserGroups(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="newGroup-wrapper">
      <div className="newGroup-container">
        <h1>New Group</h1>
        <form onSubmit={handleNewGroup} action="/groups" className="newGroup-form">
          <input type="text" name="title" placeholder="Group Title" />
          <button type="submit">Create Group</button>
        </form>
        <br />
        <br />
        <div>Groups:</div>
        {userGroups.length ? (
          userGroups.map((group, index) => (
            <div
              key={index}
              onClick={() => {
                setGroup(group);
              }}
            >
              <a href="/groups/addUsers" key={index}>
                <span>{group.title}</span>
              </a>
            </div>
          ))
        ) : (
          <div>No Groups Yet</div>
        )}
      </div>
    </div>
  );
};
export default NewGroup;
