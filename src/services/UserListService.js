import http from "../http-common";

const getAll = () => {
  return http.get("/users");
};

const update = (id) => {
  return http.put(`/users/${id}`);
};

const UserListService = {
  getAll,
  update,
};

export default UserListService;
