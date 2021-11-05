import api from "./instance";

const auth = {
  login: (data) => api.post("user/login", data),
};

export default auth;
