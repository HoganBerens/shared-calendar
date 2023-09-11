import "./NewGroup.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../utilities/configs";
import ShowGroup from "../../components/ShowGroup/ShowGroup";

const NewGroup = ({ user }) => {
  const [userGroups, setUserGroups] = useState([]);
  const [group, setGroup] = useState({});

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
    <div className="newGroup-container">
      {group.title ? (
        <div>
          <ShowGroup group={group} setGroup={setGroup} />
        </div>
      ) : (
        <div>
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
                onClick={() => {
                  setGroup(group);
                }}
                key={index}
              >
                <span>{group.title}</span>
              </div>
            ))
          ) : (
            <div>No Groups Yet</div>
          )}
        </div>
      )}
    </div>
  );
};
export default NewGroup;
