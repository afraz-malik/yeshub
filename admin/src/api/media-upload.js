import api from "./instance";

const media = {
  upload: (file) => api.post("media/upload", file),
};

export default media;
