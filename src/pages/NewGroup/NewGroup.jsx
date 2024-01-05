import "./NewGroup.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../utilities/configs";
import { useNavigate } from "react-router-dom";

const NewGroup = (props) => {
  let user = props.user;
  let setGroup = props.setGroup;
  let groups = props.groups;
  let setGroups = props.setGroups;
  let navigate = useNavigate();

  const handleNewGroup = (event) => {
    event.preventDefault();
    axios
      .post("groups", { title: event.target[0].value, user: user }, config)
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => console.log(error));
    event.target[0].value = "";
  };

  const handleSelectGroup = (group) => {
    axios
      .get(`/groups/${group._id}/show`)
      .then((response) => {
        setGroup(response.data.group);
        navigate(`/groups/${group._id}`, { state: { group: group, user: response.data.user, users: response.data.users } });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        {groups.length ? (
          groups.map((group, index) => (
            <div onClick={handleSelectGroup.bind(this, group)} key={index}>
              <span>{group.title}</span>
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
