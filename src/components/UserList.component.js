import React, { useState, useEffect } from "react";
import UserListService from "../services/UsersService";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    UserListService.getAll()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (!users) return null;

  return (
    <div>
      <h1>I Work</h1>
      <ul>
        {users.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
