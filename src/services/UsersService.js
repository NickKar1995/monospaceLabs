import http from "../http-common";

const getAll = () => {
  return http.get("/posts");
};

const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data);
};

const UserListService = {
  getAll,
  update,
};

export default UserListService;
