import React, { useState, useEffect } from "react";
import UserListService from "../services/UserListService";
import Table from "react-bootstrap/Table";
import RowComponent from "./Row.component";
import SelectedComponent from "./SelectedComponent";
import { usersData } from "../mocks/users";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const checkUser = (user_) => {
    setUsers((prevState) => {
      const userStatusChange = prevState.map((user) => {
        if (user.id === user_.id) {
          return { ...user, selected: !user.selected };
        }
        return user;
      });
      return userStatusChange;
    });
  };
  // let usersSelected = 2;
  const updatePublished = (user) => {
    const currentUser = { ...user };
    let data = {
      id: currentUser.id,
      // type: currentUser.type,
      name: currentUser.name,
      email: currentUser.email,
      phone: !currentUser.status,
    };

    UserListService.update(currentUser.id, data)
      .then((response) => {
        setUsers((prevState) => {
          const userStatusChange = prevState.map((user) => {
            if (user.id === currentUser.id) {
              return { ...user, phone: !user.phone };
            }
            return user;
          });
          return userStatusChange;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const retrieveUsers = () => {
    setLoading(true);
    UserListService.getAll()
      .then((response) => {
        const updateUser = response.data.map((user) => {
          return { ...user, selected: false };
        });
        setLoading(false);
        setUsers(updateUser);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  useEffect(() => {
    // setUsers(usersData)
    retrieveUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1>I Work</h1>
      <img src="/images/Questionmark.svg" alt="question mark" />
      <SelectedComponent users={users} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Type</th>
            <th>Name</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <RowComponent
            users={users}
            updatePublished={updatePublished}
            checkUser={checkUser}
          />
        </tbody>
      </Table>
    </div>
  );
}
