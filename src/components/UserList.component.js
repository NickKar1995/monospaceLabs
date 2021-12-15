import React, { useState, useEffect } from "react";
import UserListService from "../services/UsersService";
import Table from "react-bootstrap/Table";
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
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Active</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              {/* <td>{user.active}</td> */}
              <td>{user.type}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul> */}
    </div>
  );
}

{
  /* <ul>
  {users.map((user) => (
    <li key={user.id}>{user.name}</li>
  ))}
</ul>; */
}
