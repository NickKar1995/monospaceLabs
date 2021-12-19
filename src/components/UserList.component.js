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
  //
  const checkAll = () => {
    setUsers((prevState) => {
      const userStatusChange = prevState.map((user) => {
        return { ...user, selected: !user.selected };
      });
      return userStatusChange;
    });
  };
  //
  const updatePublished = (user) => {
    const currentUser = { ...user };
    let data = {
      id: currentUser.id,
      // type: currentUser.type,
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
      // phone: !currentUser.status,
      active: !currentUser.status,
    };

    UserListService.update(currentUser.id, data)
      .then((response) => {
        setUsers((prevState) => {
          const userStatusChange = prevState.map((user) => {
            if (user.id === currentUser.id) {
              return { ...user, active: !user.active };
              // return { ...user, phone: !user.phone };
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
  // Code for the API call (JSON Placeholder)
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
  //

  useEffect(() => {
    setUsers(usersData);                   //Disable this
    // retrieveUsers();                   //Enable this
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="wrapper">
      <div className="first-bar">
        <div className="left-side">
          <img src="/images/Questionmark.svg" alt="question mark" />
          <span>Users</span>
        </div>
        <div className="right-side">
          <img src="/images/Questionmark.svg" alt="question mark" />
          <SelectedComponent users={users} />
        </div>
      </div>
      {/* TABLE */}
      <Table hover>
        <thead>
          <tr>
            {/* <th>
              <input type="checkbox" />
            </th> */}
            <th>
              <input onClick={() => checkAll()} type="checkbox" />
              <span>Type</span>
            </th>
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
